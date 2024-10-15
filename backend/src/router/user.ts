import { Request, Response, Router } from "express";
import prisma from "../utils/db";

const router = Router();

router.post("/recharge", async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  if (!userId) {
    res.status(401).json({ message: "invalid input" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
    res.json({ message: "balance updated successfully" });
    return;
  }
});

router.post("/portfolio", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(401).json({ message: "invalid user input" });
  }
  const portfolio = await prisma.portfolio.findUnique({
    where: {
      id: userId,
    },
    include: {
      trades: true,
    },
  });
  if (portfolio?.trades) {
    res.json({ message: "Trades found successfully" });
    return;
  }
  res.json({ message: "no trades found" });
  return;
});

export default router;
