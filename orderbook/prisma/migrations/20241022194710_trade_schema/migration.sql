-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('ONGOING', 'ENDED');

-- CreateEnum
CREATE TYPE "TradeSide" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('ACTIVE', 'PAST');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('LIVE', 'EXECUTED');

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentBalances" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "buyPrice" DOUBLE PRECISION NOT NULL,
    "eventId" TEXT NOT NULL,
    "sellPrice" DOUBLE PRECISION NOT NULL,
    "buyQty" INTEGER NOT NULL,
    "sellQty" INTEGER NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "buyerOrderId" TEXT NOT NULL,
    "sellerOrderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Side" "TradeSide" NOT NULL,
    "type" "OrderType" NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "portfolioId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userId_key" ON "Portfolio"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
