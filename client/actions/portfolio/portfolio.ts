"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getOrders(userId: string) {
  const portfolio = await prisma.order.findMany({
    where: {
      userId: userId,
    },
  });

  const eventIds = Array.from(new Set(portfolio.map((trade) => trade.eventId)));
  
  const events = await prisma.event.findMany({
    where: { id: { in: eventIds } },
  });
  console.log("events", events);

  const portfolioWithTitles = portfolio.map((trade) => ({
    ...trade,
    title:
      events.find((event) => event.id === trade.eventId)?.title ||
      "Unknown Event",
  }));
  return portfolioWithTitles
 
}
