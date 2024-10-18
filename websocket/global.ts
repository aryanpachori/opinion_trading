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

export const inMemoryOrderBooks: { [eventId: string]: orderbook } = {};
