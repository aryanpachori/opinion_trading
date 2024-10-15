import express from "express";
import cors from "cors";
import userRouter from "./router/user";
import eventRouter from "./router/event";
import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/user", userRouter);
app.use("/v1/event", eventRouter);
app.listen(3000, () => {
  console.log("server is running on 3000");
});
