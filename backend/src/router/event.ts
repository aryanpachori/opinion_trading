import { Router } from "express";
import prisma from "../utils/db";
import { initializeOrderBook } from "../services/initializeOB";

const router = Router();

router.post("/create", async (req, res) => {
  const { userId, title, description } = req.body;
  if (!userId) {
    res.status(401).json({ message: "userId invalid/not found" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user) {
    if (user.role === "ADMIN") {
      const event = await prisma.event.create({
        data: {
          title: title,
          description: description,
          adminId: userId,
        },
      });
      const orderbook = initializeOrderBook();
      await prisma.orderBook.create({
        data: {
          eventId: event.id,

          yes: {
            create: orderbook.yes.map((order) => ({
              price: order.price,
              quantity: order.quantity,
              type: "SELL",
            })),
          },
          no: {
            create: orderbook.no.map((order) => ({
              price: order.price,
              quantity: order.quantity,
              type: "SELL",
            })),
          },
        },
      });
    }
    res.status(401).json({ message: "Event created successfully" });
    return;
  }
  res.status(401).json({ message: "user is not an admin" });
  return;
});

export default router;
