import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import orderRouter from "./router/order";
import { setupWebSocket } from "./service/websockets";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/worker", orderRouter);
setupWebSocket()
app.listen(3002, () => {
  console.log("worker running on 3002");
});
