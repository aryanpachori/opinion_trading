import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { redis } from "./redisClient";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3003, () => {
  console.log("server running on 3003");
});

await redis.connect().then(() => {
  console.log("connected to redis");
  startArchiver();
});

const prisma = new PrismaClient();

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

        for (const { id, message } of messages) {
          const messageData = JSON.parse(message.data);

          if (message.type == "order_creation") {
            console.log(message.type, message.data);
            const order = await prisma.order.upsert({
              where: {
                id: messageData.id,
              },
              update: {
                userId: messageData.userId,
                price: messageData.price,
                Quantity: messageData.quantity,
                type: messageData.type,
                status: messageData.status,
                eventId: messageData.eventId,
                Side: messageData.side,
              },
              create: {
                id: messageData.id,
                userId: messageData.userId,
                price: messageData.price,
                Quantity: messageData.quantity,
                type: messageData.type,
                status: messageData.status,
                eventId: messageData.eventId,
                Side: messageData.side,
              },
            });
            console.log(order);
          } else if (message.type == "trade") {
            console.log("TRADE", message.type, message.data);
            const trade = await prisma.trade.upsert({
              where: {
                id: messageData.id,
              },
              update: {
                eventId: messageData.eventId,
                sellerId: messageData.sellerId,
                sellerOrderId: messageData.sellerOrder_id,
                buyerOrderId: messageData.buyerOrder_id,
                sellQty: messageData.sell_qty,
                buyerId: messageData.buyerId,
                buyQty: messageData.buy_qty,
                buyPrice: messageData.Buyprice,
                sellPrice: messageData.Sellprice,
              },
              create: {
                id: messageData.id,
                eventId: messageData.eventId,
                sellerId: messageData.sellerId,
                sellerOrderId: messageData.sellerOrder_id,
                buyerOrderId: messageData.buyerOrder_id,
                sellQty: messageData.sell_qty,
                buyerId: messageData.buyerId,
                buyQty: messageData.buy_qty,
                buyPrice: messageData.Buyprice,
                sellPrice: messageData.Sellprice,
              },
            });
            console.log(trade);
          } else if (message.type == "order_update") {
            console.log("order_update", message.data);
            const order = await prisma.order.update({
              where: { id: messageData.id },
              data: { type: messageData.type },
            });
            console.log(order);
          } else if (message.type == "order_exit") {
            console.log("order_exit", message.data);
            const order = await prisma.order.update({
              where: { id: messageData.id },
              data: { status: messageData.type },
            });
            console.log(order);
          }

          // Acknowledge the msg after procesing
          await redis.xAck(eventGroup, consumerName, id);
        }
      }
    }
  }
}
