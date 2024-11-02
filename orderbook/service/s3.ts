import aws from "aws-sdk";
import {
  inMemory_events,
  inMemory_OrderId,
  inMemory_trades,
  inMemoryOrderBooks,
  inr_balances,
} from "../utils/global";

const s3 = new aws.S3({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});
const bucketName = "opinix";
const path = "snapshots/db.json";

export async function saveToS3(snapshot: any) {
  s3.putObject({
    Bucket: bucketName,
    Key: path,
    Body: JSON.stringify(snapshot),
    ContentType: "application/json",
  })
    .promise()
    .then(() => {
      console.log("snapshot upload successfully");
    });
}
export async function loadFromS3() {
  const data = await s3
    .getObject({
      Bucket: bucketName,
      Key: path,
    })
    .promise();
  const snapshot = JSON.parse(data.Body?.toString("utf-8")!);
  const { orderbook, balances, events, orderIds, trades } = snapshot;

  Object.assign(inMemoryOrderBooks, orderbook);
  Object.assign(inr_balances, balances);
  Object.assign(inMemory_events, events);
  Object.assign(inMemory_OrderId, orderIds);
  Object.assign(inMemory_trades, trades);
}
