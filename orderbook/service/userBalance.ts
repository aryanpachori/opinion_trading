import { inr_balances } from "../utils/global";
import { redis } from "./redisClient";

export async function userRecharge(message: any) {
  const { userId, amount, responseId } = message;
  if (inr_balances[userId]) {
    inr_balances[userId].balance += amount;
    const data = JSON.stringify({
      responseId,
      status: "SUCCESS",
      balance : inr_balances[userId].balance
    });
    console.log(inr_balances);
    redis.publish("userRecharge", data);
    return;
  } else {
    const data = JSON.stringify({
      responseId,
      status: "FAILED",
    });
    redis.publish("userRecharge", data);
    return;
  }
}

export async function userBalance(message: any) {
  const { responseId, userId } = message;
  if (inr_balances[userId]) {
    const balance = inr_balances[userId].balance;
    const data = JSON.stringify({
      responseId,
      balance,
      status: "SUCCESS",
    });
    redis.publish("userBalance", data);
    return;
  } else {
    const data = JSON.stringify({
      responseId,
      status: "FAILED",
    
    });
    redis.publish("userBalance", data);
    return;
  }
}
