import { Router } from "express";
import { inMemoryOrderBooks } from "../utils/global";

const router = Router();

router.post("/incomingOrderbook", async (req, res) => {
  const { initialData } = req.body;
  const eventId = initialData.eventId;
  if (!eventId) {
    res.json({
      message: "Invalid event ID or order book already exists",
    });
    return;
  }
  inMemoryOrderBooks[initialData.eventId] = {
    id: initialData.orderBook.id,
    eventId: initialData.eventId,
    yes: initialData.yes,
    no: initialData.no,
  };
  console.log(inMemoryOrderBooks[initialData.eventId]);
});

export default router;
