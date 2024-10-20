import { createId } from "@paralleldrive/cuid2";
import { Router } from "express";
import { engineQueue, redis } from "../services/redisClient";

const router = Router();

router.post("/create", async (req, res) => {
  const responseId = createId();
  const userId = createId();
  const data = {
    responseId,
    userId,
  };
  await engineQueue(data);
  await redis.subscribe("userCreation",)
});

export default router;
