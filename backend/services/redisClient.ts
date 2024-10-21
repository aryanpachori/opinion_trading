import { createClient } from "redis";

export const redis = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

redis.on("error", (error) => {
  console.log(error);
});

export async function engineQueue(data: any) {
  redis.lPush("engineQueue", data);
}
