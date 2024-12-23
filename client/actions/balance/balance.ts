"use server";
import axios from "axios";
export async function getBalance(userId: string) {
  const response = await axios.post(
    `http://backend-service:3000/v1/user/balance`,
    {
      userId,
    }
  );

  if (response.status === 200) {
    const data = response.data;
    console.log("data", data);
    const balance = data.balance;
    console.log("balance", balance);
    return balance;
  } else {
    throw new Error("Balance not found");
    
  }
}
