import { inMemory_trades, inMemoryOrderBooks } from "../utils/global";
import { WebsocketServer } from "./websockets";

export function initiateOrder(
  userId: string,
  eventId: string,
  type: "YES" | "NO",
  price: number,
  quantity: number
) {
  const orderbook = inMemoryOrderBooks[eventId];
  const oppType = type === "YES" ? "NO" : "YES";
  const sortedOrders = orderbook[type].sort(
    (a: any, b: any) => a.price - b.price
  );

  let remainingQty = quantity;

  for (let order of sortedOrders) {
    if (order.price <= price && remainingQty > 0) {
      if (order.price === price && order.quantity === 0) {
        orderbook[oppType].forEach((oppOrder: any) => {
          if (oppOrder.price === 10 - price) {
            oppOrder.quantity += remainingQty;
            oppOrder.userQuantities.push({
              userId: userId,
              quantity: remainingQty,
            });
            remainingQty = 0;
          }
        });
      
      }

      if (order.quantity > 0) {
        let tradeQty = Math.min(remainingQty, order.quantity);

        while (tradeQty > 0 && order.userQuantities.length > 0) {
          const userOrder = order.userQuantities[0];
          const userTradeQty = Math.min(tradeQty, userOrder.quantity);

          const tradeId = `trade_${Math.random().toString()}`;
          inMemory_trades[tradeId] = {
            eventId: eventId,
            sellerId: userOrder.userId,
            sell_qty: userTradeQty,
            buyerId: userId,
            buy_qty: userTradeQty,
            Buyprice: order.price,
            Sellprice: 10 - order.price,
          };

          userOrder.quantity -= userTradeQty;
          tradeQty -= userTradeQty;
          remainingQty -= userTradeQty;

          if (userOrder.quantity === 0) {
            order.userQuantities.shift();
          }

          order.quantity -= userTradeQty;
        }
      }
    }
  }
  console.log(inMemory_trades);
  const broadcastData = {
    orderbook: {
      yes: orderbook.YES,
      no: orderbook.NO,
    },
  };
  WebsocketServer.broadcast(eventId, broadcastData);
  return;
}
