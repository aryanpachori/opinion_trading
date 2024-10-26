"use server";

import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = process.env.CASHFREE_CLIENT_API_KEY as string;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_PASSWORD as string;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

export async function createOrder() {
  console.log("request here");
  const request = {
    order_amount: 1,
    order_currency: "INR",
    customer_details: {
      customer_id: "node_sdk_test",
      customer_name: "",
      customer_email: "example@gmail.com",
      customer_phone: "9999999999",
    },
    order_meta: {
      return_url:
        "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123",
    },
    order_note: "",
  };
  console.log("hrere too");

  Cashfree.PGCreateOrder("2023-08-01", request)
    .then((response) => {
      const a = response.data;
      console.log(a);
    })
    .catch((error) => {
      console.error("Error setting up order request:", error.response.data);
    });

  console.log("hrere too jdskfjd");
}
