import { Router } from "express";
import {
  inMemory_events,
  inMemory_OrderId,
  inMemoryOrderBooks,
  inr_balances,
} from "../utils/global";
import { initiateOrder } from "../service/intialiseOrder";
import { exit } from "../service/exit";
import { createId } from "@paralleldrive/cuid2";

const router = Router();

router.post("/initiate", async (req, res) => {
  const { userId, eventId, type, price, quantity } = req.body;
  if (!userId || !eventId || !type || !price || !quantity) {
    res.json({ message: "invalid details" });
    return;
  }
  if (inr_balances[userId].balance < price * quantity) {
    res.json({ message: "not enough balance" });
  }
  if (!inMemoryOrderBooks[eventId]) {
    res.json({ message: "no orderbook found" });
    return;
  }
  const orderId = `order_${Math.random().toString()}`;
  inMemory_OrderId[orderId] = {
    side: type,
    type: "BUY",
    price: price,
    quantity: quantity,
    status: "LIVE",
    userId: userId,
  };
  console.log(inMemory_OrderId);

  await initiateOrder(userId, eventId, type, price, quantity, orderId);
  res.json({ message: "success" });
  return;
});

router.post("/exit", async (req, res) => {
  const { userId, eventId, type, price, quantity, orderId } = req.body;
  if (
    !userId ||
    !eventId ||
    !type ||
    !price ||
    !quantity ||
    !inMemory_OrderId[orderId]
  ) {
    res.json({ message: "Invalid details" });
    return;
  }
  await exit(eventId, type, price, quantity, orderId, userId);
  res.json({ message: "Order processed successfully" });
  return;
});

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
  res.json({message : "event added successfully"})
  console.log(inMemory_events);
});

export default router;
