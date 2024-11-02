import fs from "fs";

const path = "C:\\Users\\aryan\\Web Development\\opinion_trading\\db.json";
import {
  inMemory_events,
  inMemory_OrderId,
  inMemory_trades,
  inMemoryOrderBooks,
  inr_balances,
} from "../utils/global";
import { saveToS3 } from "./s3";
export function saveSnapshot(
  inMemoryOrderBooks: any,
  inr_balances: any,
  inMemory_events: any,
  inMemory_OrderId: any,
  inMemory_trades: any
) {
  const snapshot = {
    orderbook: inMemoryOrderBooks,
    balances: inr_balances,
    events: inMemory_events,
    orderIds: inMemory_OrderId,
    trades: inMemory_trades,
    timstamp: new Date().toISOString(),
  };
  //saveToS3(snapshot);
  fs.writeFileSync(path, JSON.stringify(snapshot));
}

export function loadSnapshot() {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, "utf-8");
    const snapshot = JSON.parse(data);
    const { orderbook, balances, events, orderIds, trades } = snapshot;

    Object.assign(inMemoryOrderBooks, orderbook);
    Object.assign(inr_balances, balances);
    Object.assign(inMemory_events, events);
    Object.assign(inMemory_OrderId, orderIds);
    Object.assign(inMemory_trades, trades);
  } else {
    return null;
  }
}
