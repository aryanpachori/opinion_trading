import { createClient } from "redis";

export const redis = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

await redis.connect().then(() => {
  console.log("connected to redis");
});

export async function BroadcastChannel(eventId: string, data: any) {
  const queueData = JSON.stringify({ eventId, data });
  redis.lPush("broadcastQueue", queueData);
}

export async function BroadcastToBackend(data: any) {
  await redis.publish("engineUpdates", data);
}
BroadcastToBackend("testing publish")