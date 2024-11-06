import { createId } from "@paralleldrive/cuid2";
import {
  inMemory_OrderId,
  inMemory_trades,
  inMemoryOrderBooks,
  inr_balances,
} from "../utils/global";
import { BroadcastChannel } from "./redisClient";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function initiateOrder(
  userId: string,
  eventId: string,
  side: "YES" | "NO",
  price: number,
  quantity: number,
  orderId: string
) {
  const orderbook = inMemoryOrderBooks[eventId];
  const oppType = side === "YES" ? "NO" : "YES";
  const sortedOrders = orderbook[side].sort(
    (a: any, b: any) => a.price - b.price
  );
  const cost = price * quantity;
  inr_balances[userId].balance -= cost;
  inr_balances[userId].lockedBalance += cost;

  let remainingQty = quantity;

  for (let order of sortedOrders) {
    if (order.price <= price && remainingQty > 0) {
      if (order.price === price && order.quantity === 0) {
        orderbook[oppType].forEach(async (oppOrder: any) => {
          if (oppOrder.price === 10 - price) {
            oppOrder.quantity += remainingQty;
            if (!oppOrder.UserQuantities) {
              oppOrder.UserQuantities = [];
            }
            oppOrder.UserQuantities.push({
              userId: userId,
              quantity: remainingQty,
              orderId: orderId,
            });
            inMemory_OrderId[orderId].type = "SELL";
            // await prisma.order.update({
            //   where: {
            //     id: orderId,
            //   },
            //   data: {
            //     type: "SELL",
            //   },
            // });
            const orderUpdate = {
              id: orderId,
              type: "SELL",
            };
            await BroadcastChannel("order_update", orderUpdate);
            remainingQty = 0;
          }
        });
      }

      if (order.quantity > 0) {
        let tradeQty = Math.min(remainingQty, order.quantity);

        while (tradeQty > 0 && order.UserQuantities.length > 0) {
          const userOrder = order.UserQuantities[0];
          const userTradeQty = Math.min(tradeQty, userOrder.quantity!);
          if (
            inMemory_OrderId[userOrder.orderId!].type == "BUY" &&
            inMemory_OrderId[userOrder.orderId!].status == "EXECUTED"
          ) {
            inMemory_OrderId[userOrder.orderId!].type == "SELL";
            // await prisma.order.update({
            //   where: {
            //     id: userOrder.orderId,
            //   },
            //   data: {
            //     type: "SELL",
            //   },
            // });
            const orderUpdate = {
              id: userOrder.orderId,
              type: "SELL",
            };
            await BroadcastChannel("order_update", orderUpdate);
          }
          if (
            inMemory_OrderId[userOrder.orderId!].type == "SELL" &&
            inMemory_OrderId[userOrder.orderId!].status == "LIVE"
          ) {
            inMemory_OrderId[userOrder.orderId!].type == "BUY";
            // await prisma.order.update({
            //   where: {
            //     id: userOrder.orderId,
            //   },
            //   data: {
            //     type: "BUY",
            //   },
            // });
            const orderUpdate = {
              id: userOrder.orderId,
              type: "BUY",
            };
            await BroadcastChannel("order_update", orderUpdate);
          }

          const tradeId = createId();
          inMemory_trades[tradeId] = {
            eventId: eventId,
            sellerId: userOrder.userId!,
            sellerOrder_id: userOrder.orderId!,
            buyerOrder_id: orderId,
            sell_qty: userTradeQty,
            buyerId: userId,
            buy_qty: userTradeQty,
            Buyprice: order.price,
            Sellprice: 10 - order.price,
          };

          const tradeData = {
            id: tradeId,
            eventId: eventId,
            sellerId: userOrder.userId!,
            sellerOrder_id: userOrder.orderId!,
            buyerOrder_id: orderId,
            sell_qty: userTradeQty,
            buyerId: userId,
            buy_qty: userTradeQty,
            Buyprice: order.price,
            Sellprice: 10 - order.price,
          };
          await BroadcastChannel("trade", tradeData);
          console.log(inMemory_trades);
          userOrder.quantity! -= userTradeQty;
          tradeQty -= userTradeQty;
          remainingQty -= userTradeQty;

          if (userOrder.quantity === 0) {
            order.UserQuantities.shift();
          }
          order.quantity -= userTradeQty;

          inr_balances[userOrder.userId!].lockedBalance -=
            order.price * userTradeQty;
          inr_balances[userId].lockedBalance -= cost;
        }
      }
    }
  }

  const broadcastData = {
    eventId,
    orderbook: {
      yes: orderbook.YES,
      no: orderbook.NO,
    },
  };
  await BroadcastChannel("orderbook", broadcastData);

  return;
}
