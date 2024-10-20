interface INRBalance {
  balance: number;
  lockedBalance: number;
}
interface Trades {
  eventId: string;
  sellerId: string;
  sell_qty: number;
  buyerId: string;
  buy_qty: number;
  Buyprice: number;
  Sellprice: number;
  sellerOrder_id: string;
  buyerOrder_id: string;
}
interface orderbook {
  YES: Order[];
  NO: Order[];
}
interface Order {
  price: number;
  quantity: number;
  UserQuantities: UserQuantities[];
}
interface UserQuantities {
  userId?: string;
  quantity?: number;
  orderId?: string;
}
interface OrderSchema {
  side: "YES" | "NO";
  type: "SELL" | "BUY";
  price: number;
  quantity: number;
  status: "LIVE" | "EXECUTED";
  userId: string;
}
interface Event {
  title: string;
  description: string;
}
export const inMemoryOrderBooks: { [eventId: string]: orderbook } = {};
export const inr_balances: { [userId: string]: INRBalance } = {};
export const inMemory_trades: { [trade_id: string]: Trades } = {};
export const inMemory_OrderId: { [order_id: string]: OrderSchema } = {};
export const inMemory_events: { [eventId: string]: Event } = {};

const generateOrderbook = () => {
  const YES = [];
  const NO = [];

  for (let price = 0.5; price <= 9.5; price += 0.5) {
    YES.push({
      price: price,
      quantity: 0,
      UserQuantities: [],
    });
    NO.push({
      price: price,
      quantity: 0,
      UserQuantities: [],
    });
  }
  return { YES, NO };
};
const eventId = "testevent";
inMemoryOrderBooks[eventId] = generateOrderbook();
console.log(inMemoryOrderBooks[eventId]);

const users = ["user1", "user2", "user3", "user4"];

for (const user of users) {
  inr_balances[user] = {
    balance: 1000,
    lockedBalance: 0,
  };
}
console.log(inr_balances);
