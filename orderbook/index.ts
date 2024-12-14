import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import orderRouter, { exitOrder, initiateOrderRoute } from "./router/order";
import { redis, redis2 } from "./service/redisClient";
import { initiateOrder } from "./service/intialiseOrder";
import { exit } from "./service/exit";
import { userCreate, userLogin } from "./service/userAuth";
import { userBalance, userRecharge } from "./service/userBalance";
import { fetchEvent, getEvents } from "./service/events";
import { loadSnapshot, saveSnapshot } from "./service/crashService";
import {
  inMemory_events,
  inMemory_OrderId,
  inMemory_trades,
  inMemoryOrderBooks,
  inr_balances,
} from "./utils/global";
import { loadFromS3, saveToS3 } from "./service/s3";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/worker", orderRouter);
async function processQueue() {
  while (true) {
    const data: any = await redis2.brPop("engineQueue", 0);
    if (!data) continue;
    console.log(data);
    const { element } = data;
    const message = JSON.parse(element);
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

      case "eventdetails":
        await fetchEvent(message);
        break;
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
//loadFromS3();
setInterval(() => {
  const snapshot = {
    orderbook: inMemoryOrderBooks,
    balances: inr_balances,
    events: inMemory_events,
    orderIds: inMemory_OrderId,
    trades: inMemory_trades,
    timstamp: new Date().toISOString(),
  };
  saveSnapshot(
    inMemoryOrderBooks,
    inr_balances,
    inMemory_events,
    inMemory_OrderId,
    inMemory_trades
  );
}, 1000000);

console.log(inMemoryOrderBooks, inr_balances);
