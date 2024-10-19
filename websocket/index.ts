import { createClient } from "redis";
import { setupWebSocket, WebsocketServer } from "./websocket";
import { inMemoryOrderBooks } from "./global";

export const redis = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

await redis.connect().then(() => {
  console.log("connected to redis");
});

async function processQueue() {
  while (true) {
    const message = await redis.rPop("broadcastQueue");
    if (message) {
      const { eventId, data } = JSON.parse(message);
      const orderbook = data.orderbook

      inMemoryOrderBooks[eventId] = { orderbook };

      inMemoryOrderBooks[eventId] = { orderbook};

      WebsocketServer.broadcast(eventId, data);
    }
  }
}
setupWebSocket();
setInterval(() => {
  processQueue();
}, 1000);
