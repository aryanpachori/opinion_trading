import { inMemory_events } from "../utils/global";
import { redis } from "./redisClient";

export async function getEvents(message: any) {
  const { responseId } = message;
  const events = inMemory_events;
  const data = JSON.stringify({
    responseId,
    events,
    status: "SUCCESS",
  });
  console.log(data);
  redis.publish("getEvent", data);
  return;
}
