import { Router } from "express";
import { inMemoryOrderBooks } from "../utils/global";

const router = Router();

router.post("/incomingOrderbook", async (req, res) => {
  const { workerOB } = req.body;
  const eventId = workerOB.eventId;
  if (!eventId) {
    res.json({
      message: "Invalid event ID or order book already exists",
    });
    return;
  }
  inMemoryOrderBooks[workerOB.eventId] = {
    id: workerOB.id,
    eventId: workerOB.eventId,
    yes: workerOB.yes,
    no: workerOB.no,
  };
  console.log(inMemoryOrderBooks)
  res.json({ message: "orderbook saved in-memory" });
  return;
});

export default router;
