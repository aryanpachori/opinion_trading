"use server"
import axios from "axios";

export async function recharge(userId: string, depositAmount: number) {
  const response = await axios.post(
    ` http://backend-service:3000/v1/user/recharge`,
    {
      userId,
      amount: depositAmount,
    }
  );
  if (response.status === 200) {
    return { success: true };
  }
  throw new Error("error to recharge");
  return
}
