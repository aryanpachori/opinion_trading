import Redis from "ioredis";
import { createClient } from "redis";

export const redis = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

const redis2 = new Redis(
  process.env.AIVEN_REDIS!
);

redis.on("error", (error) => {
  console.log(error);
});

export async function engineQueue(data: any) {
  redis2.lpush("engineQueue", data);
}
