import { PrismaClient } from "@prisma/client";
import { inr_balances } from "../utils/global";
import { redis } from "./redisClient";
const prisma = new PrismaClient();
export async function userCreate(message: any) {
  const { responseId, userId } = message;
  if (!inr_balances[userId]) {
    inr_balances[userId] = {
      balance: 0,
      lockedBalance: 0,
    };
    await prisma.user.create({
      data: {
        id: userId,
        email: `${responseId}@gmail.com`,
      },
    });
    console.log(inr_balances);
    const data = JSON.stringify({
      status: "SUCCESS",
      responseId,
    });
    redis.publish("userCreation", data);
    return;
  } else {
    const data = JSON.stringify({
      status: "FAILED",
      responseId,
    });
    redis.publish("userCreation", data);
    return;
  }
}

export async function userLogin(message: any) {
  const { responseId, userId } = message;
  if (!inr_balances[userId]) {
    inr_balances[userId] = {
      balance: 0,
      lockedBalance: 0,
    };
    const data = JSON.stringify({
      responseId,
      status: "SUCCESS",
    });
    redis.publish("userLogin", data);
    return;
  } else {
    const data = JSON.stringify({
      responseId,
      status: "FAILED",
    });
    redis.publish("userLogin", data);
    return;
  }
}
