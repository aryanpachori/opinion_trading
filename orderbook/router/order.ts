import { Router } from "express";
import { inMemoryOrderBooks } from "../utils/global";
import { initiateOrder } from "../service/intialiseOrder";

const router = Router();

router.post("/buyOrder", async(req, res) => {
  const { userId, eventId, type, price, quantity } = req.body;
  if (!userId || !eventId || !type || !price || !quantity) {
    res.json({ message: "invalid details" });
    return;
  }
  if (!inMemoryOrderBooks[eventId]) {
    res.json({ message: "no orderbook found" });
    return;
  }
  

 await initiateOrder(userId, eventId, type, price, quantity)
 res.json({ message: "success" });
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

export default router;
