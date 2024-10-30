import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { redis } from "./redisClient";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3003, () => {
  console.log("server running on 3003");
});
await redis.connect().then(() => {
  console.log("connected to  redis");
  startArchiver();
});

async function startArchiver() {
  const eventGroup = "event_streams";
  const consumerName = "archiver_consumer";
  let lastId = ">";

  while (true) {
    const message = await redis.xReadGroup(
      consumerName,
      "archiver_consumer",
      [{ key: eventGroup, id: lastId }],
      { BLOCK: 0, COUNT: 1 }
    );
    if (message && message.length > 0) {
      const streamData = message[0];
      if (streamData && streamData.messages.length > 0) {
        const messages = streamData.messages;
        messages.forEach(({ id, message }: { id: string; message: any }) => {
          console.log(message);
          if (message.type == "trade") {
            console.log(message.type);
            console.log(message.data);
          }
        });
      }
    }
  }
}
