import Redis from "ioredis";
import { createClient } from "redis";

export const redis = createClient({
  socket: {
    host: "redis",
    port: 6379,
  },
});

export const redis2 = createClient({
  socket: {
    host: "redis2",
    port: 6379,
  },
});

redis.on("error", (error) => {
  console.log(error);
});

export async function engineQueue(data: any) {
  redis2.lPush("engineQueue", data);
}
