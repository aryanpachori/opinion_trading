import express from "express";
import cors from "cors";
import userRouter from "./router/user";
import eventRouter from "./router/event";
import bodyParser from "body-parser";
import { redis, redis2 } from "./services/redisClient";


const app = express();
await redis.connect().then(() => {
  console.log("connected to redis");
});
await redis2.connect().then(() => {
  console.log("connected to redis2");
});
app.use(cors());
app.use(bodyParser.json());
app.use("/v1/user", userRouter);
app.use("/v1/event", eventRouter);

app.listen(3000, () => {
  console.log("server is running on 3000");
});
