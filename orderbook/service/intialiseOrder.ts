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
        orderbook[oppType].forEach((oppOrder: any) => {
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

            remainingQty = 0;
          }
        });
      }

      if (order.quantity > 0) {
        let tradeQty = Math.min(remainingQty, order.quantity);

        while (tradeQty > 0 && order.UserQuantities.length > 0) {
          const userOrder = order.UserQuantities[0];
          const userTradeQty = Math.min(tradeQty, userOrder.quantity!);
          if (inMemory_OrderId[userOrder.orderId!].type == "SELL") {
            inMemory_OrderId[userOrder.orderId!].status == "EXECUTED";
            await prisma.order.update({
              where: {
                id: userOrder.orderId,
              },
              data: {
                status: "EXECUTED",
              },
            });
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
          await prisma.trade.create({
            data: {
              id: tradeId,
              eventId: eventId,
              sellerId: userOrder.userId!,
              sellerOrderId: userOrder.orderId!,
              buyerOrderId: orderId,
              buyerId: userId,
              sellQty: userOrder.quantity!,
              buyQty: tradeQty,
              buyPrice: order.price,
              sellPrice: 10 - order.price,
            },
          });
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
    orderbook: {
      yes: orderbook.YES,
      no: orderbook.NO,
    },
  };
  await BroadcastChannel(eventId, broadcastData);

  return;
}
