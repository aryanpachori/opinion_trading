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

export async function startEngine() {
  await redis.connect().then(() => {
    console.log("connected to redis");
  });
  await redis2.connect().then(() => {
    console.log("connected to redis2");
  });
  await initializeStreamGroups();
}

async function initializeStreamGroups() {
  try {
    await redis.xGroupCreate("event_streams", "ws_broadcast_consumer", "$", {
      MKSTREAM: true,
    });
    await redis.xGroupCreate("event_streams", "archiver_consumer", "$", {
      MKSTREAM: true,
    });
    console.log("consumer groups created!");
  } catch (error: any) {
    if (error.message.includes("BUSYGROUP")) {
      console.log("consumer grp already exists");
    }
    console.log(error);
  }
}

export async function BroadcastChannel(eventType: string, data: any) {
  const streamData = {
    type: eventType,
    data: JSON.stringify(data),
  };
  // const queueData = JSON.stringify({ eventId, data });
  // redis.lPush("broadcastQueue", queueData);

  await redis.xAdd("event_streams", "*", streamData);
}

startEngine();
