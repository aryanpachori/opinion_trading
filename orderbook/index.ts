import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import orderRouter, { exitOrder, initiateOrderRoute } from "./router/order";
import { redis} from "./service/redisClient";
import { initiateOrder } from "./service/intialiseOrder";
import { exit } from "./service/exit";
import { userCreate, userLogin } from "./service/userAuth";
import { userBalance, userRecharge } from "./service/userBalance";
import { getEvents } from "./service/events";
import { loadSnapshot, saveSnapshot } from "./service/crashService";
import {
  inMemory_events,
  inMemory_OrderId,
  inMemory_trades,
  inMemoryOrderBooks,
  inr_balances,
} from "./utils/global";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/worker", orderRouter);
async function processQueue() {
  while (true) {
    const data = await redis.rPop("engineQueue");
    if (data) {
      const message = JSON.parse(data);
      console.log(message);
      const { type } = message;

      switch (type) {
        case "userCreation":
          await userCreate(message);
          break;

        case "userLogin":
          await userLogin(message);
          break;

        case "userRecharge":
          await userRecharge(message);
          break;

        case "userBalance":
          await userBalance(message);
          break;

        case "getEvents":
          await getEvents(message);
          break;
        case "initiateOrder":
          await initiateOrderRoute(message);
          break;

        case "orderExit":
          await exitOrder(message);
          break;
      }
    }
  }
}
app.listen(3002, () => {
  console.log("worker running on 3002");
});
setInterval(() => {
  processQueue();
}, 1000);

loadSnapshot();
setInterval(() => {
  saveSnapshot(
    inMemoryOrderBooks,
    inr_balances,
    inMemory_events,
    inMemory_OrderId,
    inMemory_trades
  );
 
}, 10000);

console.log({ inMemoryOrderBooks, inr_balances , inMemory_OrderId});
