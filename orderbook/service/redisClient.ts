import Redis from "ioredis";
import { createClient } from "redis";


export const redis = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

export const redis2 = new Redis(process.env.AIVEN_REDIS!)

await redis.connect().then(() => {
  console.log("connected to redis");
});

export async function BroadcastChannel(eventId: string, data: any) {
  const queueData = JSON.stringify({ eventId, data });
  redis.lPush("broadcastQueue", queueData);
}
