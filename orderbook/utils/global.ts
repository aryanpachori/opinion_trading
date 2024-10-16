export const inMemoryOrderBooks: { [eventId: string]: any } = {};
export const inr_balances: { [userId: string]: any } = {};

const generateOrderbook = () => {
  const YES = [];
  const NO = [];

  for (let price = 0.5; price <= 9.5; price += 0.5) {
    YES.push({
      price: price,
      quantity: 0,
      userQuantites: [],
    });
    NO.push({
      price: price,
      quantity: 0,
      userQuantites: [],
    });
  }
  return { YES,NO};
};
const eventId = "testevent";
inMemoryOrderBooks[eventId] = generateOrderbook();
console.log(inMemoryOrderBooks[eventId])

const UserId  = "user1";
const UserId_2 = "user2"
inr_balances[UserId] = {
    balance : 1000,
    lockedBalance : 0
}
inr_balances[UserId_2] = {
    balance : 1000,
    lockedBalance : 0
}
console.log(inr_balances)