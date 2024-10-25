"use server"
import axios from "axios";
export async function getBalance(userId: string) {
  const response = await axios.post(`${process.env.BACKEND_URL!}/user/balance`, {
    userId,
  });
  
  if (response.status === 200) {
    const data = response.data;

    const balance = data.balance;
  
    return balance;
  } else {
    throw new Error("Balance not found");
  }
}
