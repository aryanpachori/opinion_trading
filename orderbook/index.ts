import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import orderRouter from "./router/order";
import { redis } from "./service/redisClient";

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
    }
  }
}
app.listen(3002, () => {
  console.log("worker running on 3002");
});
setInterval(() => {
  processQueue();
}, 1000);
