import { createId } from "@paralleldrive/cuid2";
import { Router } from "express";
import { engineQueue, redis } from "../services/redisClient";

const router = Router();

router.post("/signin", async (req, res) => {
  const { userId } = req.body;

  const responseId = createId();
  const data = JSON.stringify({
    userId,
    responseId,
    type: "userLogin",
  });
  await engineQueue(data);
  await redis.subscribe("userLogin", (data) => {
    const parseData = JSON.parse(data);
    if (parseData.responseId == responseId && parseData.status == "SUCCESS") {
      redis.unsubscribe("userLogin");
      return res.json({ message: "user login successfull" });
    }
    redis.unsubscribe("userLogin");
    return res.status(401).json({ message: "user not found" });
  });
});

router.post("/create", async (req, res) => {
  const responseId = createId();
  const userId = createId();
  const data = JSON.stringify({
    responseId,
    userId,
    type: "userCreation",
  });

  await engineQueue(data);

  await redis.subscribe("userCreation", (data) => {
    const parseData = JSON.parse(data);
    if (parseData.responseId == responseId) {
      redis.unsubscribe("userCreation");
      return res.json({
        message: `"user added successfully with id:"${userId}`,
      });
    }
    redis.unsubscribe("userCreation");
    return res.status(401).json({ message: "user failed to create" });
  });
});

router.post("/recharge", async (req, res) => {
  const { userId, amount } = req.body;
  const responseId = createId();
  const data = JSON.stringify({
    userId,
    amount,
    responseId,
    type: "userRecharge",
  });
  await engineQueue(data);
  await redis.subscribe("userRecharge", (data) => {
    const parseData = JSON.parse(data);
    if (parseData.responseId == responseId && parseData.status === "SUCCESS") {
      redis.unsubscribe("userRecharge");
      return res.json(`"Total available balance :"${parseData.balance}`);
    }
    redis.unsubscribe("userRecharge");
    return res.status(401).json({ message: "user recharge failed" });
  });
});

router.post("/balance", async (req, res) => {
  const { userId } = req.body;
  const responseId = createId();

  const data = JSON.stringify({
    userId,
    responseId,
    type: "userBalance",
  });
  await engineQueue(data);
  await redis.subscribe("userBalance", (data) => {
    const parseData = JSON.parse(data);
    if (parseData.responseId == responseId && parseData.status === "SUCCESS") {
      redis.unsubscribe("userBalance");
     
     return res.json({ balance: parseData.balance });
    }
    redis.unsubscribe("userBalance");
    return res.json("error fetching the balance");
  });
});

export default router;
