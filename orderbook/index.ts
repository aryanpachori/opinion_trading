import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import orderRouter from "./router/order";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/worker", orderRouter);


app.listen(3002, () => {
  console.log("worker running on 3002");
});
