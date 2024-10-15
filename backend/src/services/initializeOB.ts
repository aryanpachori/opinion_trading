interface Order {
  price: number;
  quantity: number;
}
type OrderBook = {
  yes: Order[];
  no: Order[];
};

export const initializeOrderBook = (): OrderBook => {
  const orderBook: OrderBook = {
    yes: [],
    no: [],
  };

  for (let price = 0.5; price <= 9.5; price += 0.5) {
    orderBook.yes.push({
      price,
      quantity: 0,
    });
    orderBook.no.push({
      price,
      quantity: 0,
    });
  }

  return orderBook;
};
