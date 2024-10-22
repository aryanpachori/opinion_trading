import { createId } from "@paralleldrive/cuid2";
import { Router } from "express";
import { engineQueue, redis } from "../services/redisClient";

const router = Router();

router.post("/", async (req, res) => {
  const responseId = createId();
  const data = JSON.stringify({
    responseId,
    type: "getEvents",
  });
  await engineQueue(data);
  await redis.subscribe("getEvent", (data) => {
    const parseData = JSON.parse(data);
    if (parseData.responseId == responseId && parseData.status == "SUCCESS") {
      redis.unsubscribe("getEvent");
      return res.json(parseData.events);
    }
    redis.unsubscribe("getEvent");
    return res.status(401).json({ message: "error fetching events" });
  });
});

router.post("/initiate", async (req, res) => {
  const { userId, eventId, side, price, quantity } = req.body;
  if (!userId || !eventId || !side || !price || !quantity) {
    res.status(401).json({ message: "invalid information" });
    return;
  }
  const responseId = createId();
  const data = JSON.stringify({
    userId,
    eventId,
    responseId,
    side,
    price,
    quantity,
    type: "initiateOrder",
  });
  await engineQueue(data);
  await redis.subscribe("initiateOrder", (data) => {
    const parseData = JSON.parse(data);
    if (parseData.responseId === responseId && parseData.status == "SUCCESS") {
      redis.unsubscribe("initiateOrder");
      return res.json({ message: "order placed successfully" });
    }
    redis.unsubscribe("initiateOrder");
    return res.status(401).json({ message: "error placing order" });
  });
});

router.post("/exit", async (req, res) => {
  const { eventId, userId, orderId, side, price, quantity } = req.body;

  const responseId = createId();
  const data = JSON.stringify({
    userId,
    orderId,
    eventId,
    responseId,
    side,
    price,
    quantity,
    type: "orderExit",
  });
  await engineQueue(data);
  await redis.subscribe("orderExit", (data) => {
    const parseData = JSON.parse(data);
    if (parseData.responseId == responseId && parseData.status == "SUCCESS") {
      redis.unsubscribe("orderExit");
      return res.json({ message: "order exited successfully" });
    }
    redis.unsubscribe("orderExit");
    return res.status(401).json({ message: "error exiting the order" });
  });
});

export default router;

