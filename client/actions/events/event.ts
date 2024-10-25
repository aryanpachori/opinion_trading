
"use server"
import axios from "axios";

export async function getEvents() {
  const response = await axios.post(`${process.env.BACKEND_URL}/event`);

  if (response.status == 200) {
    console.log("responseData :",response.data)
   
    return response.data
  }
  throw new Error("error fetching events");
}
