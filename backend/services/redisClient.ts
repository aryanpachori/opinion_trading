import Redis from "ioredis";
import { createClient } from "redis";

export const redis = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

export const redis2 = createClient({
  socket: {
    host: "localhost",
    port: 6380,
  },
});

redis.on("error", (error) => {
  console.log(error);
});

export async function engineQueue(data: any) {
  redis2.lPush("engineQueue", data);
}
