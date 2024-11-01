import { createId } from "@paralleldrive/cuid2";
import {
  inMemory_OrderId,
  inMemory_trades,
  inMemoryOrderBooks,
} from "../utils/global";
import { BroadcastChannel } from "./redisClient";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function exit(
  eventId: string,
  side: "YES" | "NO",
  price: number,
  quantity: number,
  orderId: string,
  userId: string
) {
  const sellprice = 10 - price;
  const orderbook = inMemoryOrderBooks[eventId];
  const Oppside = side === "NO" ? "YES" : "NO";

  let totalOppQuantity = 0;

  orderbook[Oppside].forEach((order) => {
    if (order.price === sellprice) {
      totalOppQuantity = order.quantity;
    }
  });

  if (totalOppQuantity >= quantity) {
    let remainingQuantity = quantity;

    orderbook[Oppside].forEach(async (order) => {
      if (order.price === sellprice && remainingQuantity > 0) {
        for (let i = 0; i < order.UserQuantities.length; i++) {
          const userOrder = order.UserQuantities[i];

          if (userOrder.quantity! >= remainingQuantity) {
            const tradeId = createId();

            inMemory_trades[tradeId] = {
              eventId: eventId,
              sellerId: userId,
              sellerOrder_id: orderId,
              buyerOrder_id: userOrder.orderId!,
              sell_qty: remainingQuantity,
              buyerId: userOrder.userId!,
              buy_qty: remainingQuantity,
              Buyprice: order.price,
              Sellprice: price,
            };

            // await prisma.trade.create({
            //   data: {
            //     id: tradeId,
            //     eventId: eventId,
            //     sellerId: userId,
            //     sellerOrderId: orderId,
            //     buyerId: userOrder.userId!,
            //     buyerOrderId: userOrder.orderId!,
            //     sellQty: remainingQuantity,
            //     buyQty: remainingQuantity,
            //     buyPrice: order.price,
            //     sellPrice: price,
            //   },
            // });
            const tradeData = {
              id: tradeId,
              eventId: eventId,
              sellerId: userId,
              sellerOrder_id: orderId,
              buyerOrder_id: userOrder.orderId!,
              sell_qty: remainingQuantity,
              buyerId: userOrder.userId!,
              buy_qty: remainingQuantity,
              Buyprice: order.price,
              Sellprice: price,
            };
            await BroadcastChannel("trade", tradeData);
            userOrder.quantity! -= remainingQuantity;
            if (userOrder.quantity === 0) {
              order.UserQuantities.splice(i, 1);
              i--;
            }

            remainingQuantity = 0;

            break;
          } else {
            const tradeId = createId();

            inMemory_trades[tradeId] = {
              eventId: eventId,
              sellerId: userId,
              sellerOrder_id: orderId,
              buyerOrder_id: userOrder.orderId!,
              sell_qty: userOrder.quantity!,
              buyerId: userOrder.userId!,
              buy_qty: userOrder.quantity!,
              Buyprice: order.price,
              Sellprice: price,
            };
            // await prisma.trade.create({
            //   data: {
            //     id: tradeId,
            //     eventId: eventId,
            //     sellerId: userId,
            //     buyerId: userOrder.userId!,
            //     sellerOrderId: orderId,
            //     buyerOrderId: userOrder.orderId!,
            //     sellPrice: price,
            //     buyPrice: order.price,
            //     sellQty: userOrder.quantity!,
            //     buyQty: userOrder.quantity!,
            //   },
            // });
            const tradeData = {
              id: tradeId,
              eventId: eventId,
              sellerId: userId,
              sellerOrder_id: orderId,
              buyerOrder_id: userOrder.orderId!,
              sell_qty: userOrder.quantity!,
              buyerId: userOrder.userId!,
              buy_qty: userOrder.quantity!,
              Buyprice: order.price,
              Sellprice: price,
            };
            await BroadcastChannel("trade", tradeData);

            remainingQuantity -= userOrder.quantity!;

            order.UserQuantities.splice(i, 1);
            i--;
          }
        }
        inMemory_OrderId[orderId].status = "EXECUTED";
        // await prisma.order.update({
        //   where: {
        //     id: orderId,
        //   },
        //   data: {
        //     status: "EXECUTED",
        //   },
        // });
        const orderExit = {
          id: orderId,
          status: "EXECUTED",
        };
        await BroadcastChannel("order_exit", orderExit);
        console.log(inMemory_OrderId[orderId]);
        order.quantity -= quantity;
      }
    });
  } else {
    orderbook[Oppside].find((order) => {
      if (order.price == sellprice) {
        order.quantity += quantity;
        order.UserQuantities.push({
          userId: userId,
          quantity: quantity,
          orderId: orderId,
        });
      }
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
