export const inMemoryOrderBooks: { [eventId: string]: any } = {};
export const inr_balances: { [userId: string]: any } = {};
export const inMemory_trades: { [trade_id: string]: any } = {};

const generateOrderbook = () => {
  const YES = [];
  const NO = [];

  for (let price = 0.5; price <= 9.5; price += 0.5) {
    YES.push({
      price: price,
      quantity: 0,
      userQuantities: [],
    });
    NO.push({
      price: price,
      quantity: 0,
      userQuantities: [],
    });
  }
  return { YES, NO };
};
const eventId = "testevent";
inMemoryOrderBooks[eventId] = generateOrderbook();
console.log(inMemoryOrderBooks[eventId]);

const users = ["user1", "user2", "user3"];

for (const user of users) {
  inr_balances[user] = {
    balance: 1000,
    lockedBalance: 0,
  };
}

console.log(inr_balances);
