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
  processStream();
});

async function processStream() {
  const streamName = "event_streams";
  const consumerName = "ws_broadcast_consumer";
  let lastId = ">";

  while (true) {
    const message = await redis.xReadGroup(
      consumerName,
      "ws_broadcast_consumer",
      [{ key: streamName, id: lastId }],
      { BLOCK: 0, COUNT: 1 }
    );

    if (message && message.length > 0) {
      const streamData = message[0];
      if (
        streamData &&
        Array.isArray(streamData.messages) &&
        streamData.messages.length > 0
      ) {
        const messages = streamData.messages;

        messages.forEach(({ id, message }: { id: string; message: any }) => {
          const messageData = JSON.parse(message.data);

          const eventId = messageData.eventId;
          const orderbook = messageData.orderbook;
          inMemoryOrderBooks[eventId] = { orderbook };
          console.log(`Event ID: ${eventId}`, orderbook);
          WebsocketServer.broadcast(eventId, {orderbook});
        });
      }
    }else{
      console.log("no events at the moment")
    }
  }
}

setupWebSocket();
