import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { startWorker } from "./service/intialiseWorker";
import orderRouter from "./router/order";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("v1/worker/", orderRouter);
startWorker();

app.listen(3002, () => {
  console.log("worker running on 3002");
});
