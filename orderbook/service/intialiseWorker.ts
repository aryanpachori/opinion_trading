import { PrismaClient } from "@prisma/client";
import { inMemoryOrderBooks, inr_balances } from "../utils/global";
const prisma = new PrismaClient();
export async function startWorker() {
  const activeEvents = await prisma.event.findMany({
    where: {
      status: "ONGOING",
    },
    include: {
      orderBook: {
        include: {
          yes: true,
          no: true,
        },
      },
    },
  });

  activeEvents.forEach((event) => {
    if (event.orderBook) {
      inMemoryOrderBooks[event.id] = {
        id: event.orderBook.id,
        eventId: event.id,
        yes: event.orderBook.yes,
        no: event.orderBook.no,
      };
    }
  });
  console.log("All active orderbooks reinitialized from database.");

  const balances = await prisma.user.findMany();
  balances.forEach((user) => {
    inr_balances[user.id] = {
        id : user.id,
      balance: user.balance,
    };
    console.log(inr_balances[user.id])
  });
}
