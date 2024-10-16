import { inMemoryOrderBooks } from "../utils/global";
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
  orderbook[type].forEach((order: any) => {
    if (order.price == price) {
      if (order.quantity == 0) {
        // will be added in the opposite side of the orderbook 10 - price
        orderbook[oppType].forEach((order: any) => {
          if (order.price === 10 - price) {
            order.quantity += quantity;
            order.userQuantites.push({
              userId: userId,
              quantity: quantity,
            });
          }
        });
      }
    }
  });
  const broadcastData = {
    orderbook: {
      yes: orderbook.YES,
      no: orderbook.NO,
    },
  };
  WebsocketServer.broadcast(eventId, broadcastData);
  return;
}
