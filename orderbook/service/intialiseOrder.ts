import {
  inMemory_trades,
  inMemoryOrderBooks,
  inr_balances,
} from "../utils/global";
import { BroadcastChannel } from "./redisClient";


export async function initiateOrder(
  userId: string,
  eventId: string,
  type: "YES" | "NO",
  price: number,
  quantity: number,
  orderId: string
) {
  const orderbook = inMemoryOrderBooks[eventId];
  const oppType = type === "YES" ? "NO" : "YES";
  const sortedOrders = orderbook[type].sort(
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

          const tradeId = `trade_${Math.random().toString()}`;
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
