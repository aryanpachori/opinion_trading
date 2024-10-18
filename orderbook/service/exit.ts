import {
  inMemory_OrderId,
  inMemory_trades,
  inMemoryOrderBooks,
} from "../utils/global";
import { WebsocketServer } from "./websockets";

export async function exit(
  eventId: string,
  type: "YES" | "NO",
  price: number,
  quantity: number,
  orderId: string,
  userId: string
) {
  const sellprice = 10 - price;
  const orderbook = inMemoryOrderBooks[eventId];
  const Oppside = type === "NO" ? "YES" : "NO";

  let totalOppQuantity = 0;

  orderbook[Oppside].forEach((order) => {
    if (order.price === sellprice) {
      totalOppQuantity = order.quantity;
    }
  });

  if (totalOppQuantity >= quantity) {
    let remainingQuantity = quantity;

    orderbook[Oppside].forEach((order) => {
      if (order.price === sellprice && remainingQuantity > 0) {
        for (let i = 0; i < order.UserQuantities.length; i++) {
          const userOrder = order.UserQuantities[i];

          if (userOrder.quantity! >= remainingQuantity) {
            const tradeId = `trade_${Math.random().toString()}`;

            inMemory_trades[tradeId] = {
              eventId: eventId,
              sellerId: userOrder.userId!,
              sellerOrder_id: userOrder.orderId!,
              buyerOrder_id: orderId,
              sell_qty: remainingQuantity,
              buyerId: userId,
              buy_qty: remainingQuantity,
              Buyprice: price,
              Sellprice: sellprice,
            };

            userOrder.quantity! -= remainingQuantity;
            if (userOrder.quantity === 0) {
              order.UserQuantities.splice(i, 1);
              i--;
            }

            remainingQuantity = 0;

            break;
          } else {
            const tradeId = `trade_${Math.random().toString()}`;

            inMemory_trades[tradeId] = {
              eventId: eventId,
              sellerId: userOrder.userId!,
              sellerOrder_id: userOrder.orderId!,
              buyerOrder_id: orderId,
              sell_qty: userOrder.quantity!,
              buyerId: userId,
              buy_qty: userOrder.quantity!,
              Buyprice: price,
              Sellprice: sellprice,
            };

            remainingQuantity -= userOrder.quantity!;

            order.UserQuantities.splice(i, 1);
            i--;
          }
        }
        inMemory_OrderId[orderId].status = "EXECUTED";
          console.log(inMemory_OrderId[orderId])
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
    console.log(inMemory_OrderId[orderId])
  }
  const broadcastData = {
    orderbook: {
      yes: orderbook.YES,
      no: orderbook.NO,
    },
  };
  WebsocketServer.broadcast(eventId, broadcastData);
  return;
}
