import { Router } from "express";
import {
  generateOrderbook,
  inMemory_events,
  inMemory_OrderId,
  inMemoryOrderBooks,
  inr_balances,
} from "../utils/global";
import { initiateOrder } from "../service/intialiseOrder";
import { exit } from "../service/exit";
import { createId } from "@paralleldrive/cuid2";
import { BroadcastChannel, redis } from "../service/redisClient";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
export const initiateOrderRoute = async (message: any) => {
  const { userId, eventId, side, price, quantity, responseId } = message;
  if (
    !userId ||
    !eventId ||
    !side ||
    !price ||
    !quantity ||
    !responseId ||
    inr_balances[userId].balance < price * quantity ||
    !inMemoryOrderBooks[eventId]
  ) {
    const data = JSON.stringify({
      responseId,
      status: "FAILED",
    });

    redis.publish("initiateOrder", data);
    return;
  }

  const orderId = createId();
  inMemory_OrderId[orderId] = {
    side: side,
    type: "BUY",
    price: price,
    quantity: quantity,
    status: "LIVE",
    userId: userId,
    eventId: eventId,
  };
  await prisma.order.create({
    data: {
      id: orderId,
      price: price,
      Quantity: quantity,
      userId: userId,
      Side: side,
      type: "BUY",
      status: "LIVE",
      eventId: eventId,
    },
  });
  console.log(inMemory_OrderId);

  await initiateOrder(userId, eventId, side, price, quantity, orderId);
  const data = JSON.stringify({
    responseId,
    status: "SUCCESS",
  });
  redis.publish("initiateOrder", data);
  return;
};

export const exitOrder = async (message: any) => {
  const { userId, eventId, side, price, quantity, orderId, responseId } =
    message;
  if (
    !userId ||
    !eventId ||
    !side ||
    !price ||
    !quantity ||
    !inMemory_OrderId[orderId] ||
    !responseId
  ) {
    const data = JSON.stringify({
      responseId,
      status: "FAILED",
    });
    redis.publish("orderExit", data);
    return;
  }
  await exit(eventId, side, price, quantity, orderId, userId);
  const data = JSON.stringify({
    responseId,
    status: "SUCCESS",
  });
  redis.publish("orderExit", data);
  return;
};

// router.post("/incomingOrderbook", async (req, res) => {
//   const { workerOB } = req.body;
//   const eventId = workerOB.eventId;
//   if (!eventId) {
//     res.json({
//       message: "Invalid event ID or order book already exists",
//     });
//     return;
//   }
//   inMemoryOrderBooks[workerOB.eventId] = {
//     id: workerOB.id,
//     eventId: workerOB.eventId,
//     yes: workerOB.yes,
//     no: workerOB.no,
//   };
//   console.log(inMemoryOrderBooks)
//   res.json({ message: "orderbook saved in-memory" });
//   return;
// });

router.post("/event", async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(401).json({ message: "invalid details" });
  }
  const eventId = createId();
  inMemory_events[eventId] = {
    title: title,
    description: description,
  };
  await prisma.event.create({
    data: {
      id: eventId,
      title: title,
      description: description,
    },
  });
  inMemoryOrderBooks[eventId] = generateOrderbook();
  const orderbook = inMemoryOrderBooks[eventId];
  const broadcastData = {
    eventId,
    orderbook: {
      yes: orderbook.YES,
      no: orderbook.NO,
    },
  };
  await BroadcastChannel("orderbook", broadcastData);
  res.json({ message: "event added successfully" });
  console.log(inMemory_events);
});

export default router;
