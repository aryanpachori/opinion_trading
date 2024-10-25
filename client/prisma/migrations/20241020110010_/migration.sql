/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NoOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserQuantities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YesOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_adminId_fkey";

-- DropForeignKey
ALTER TABLE "NoOrder" DROP CONSTRAINT "NoOrder_orderBookId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderBook" DROP CONSTRAINT "OrderBook_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuantities" DROP CONSTRAINT "UserQuantities_noOrderid_fkey";

-- DropForeignKey
ALTER TABLE "UserQuantities" DROP CONSTRAINT "UserQuantities_orderId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuantities" DROP CONSTRAINT "UserQuantities_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuantities" DROP CONSTRAINT "UserQuantities_yesOrderid_fkey";

-- DropForeignKey
ALTER TABLE "YesOrder" DROP CONSTRAINT "YesOrder_orderBookId_fkey";

-- DropForeignKey
ALTER TABLE "_EventParticipants" DROP CONSTRAINT "_EventParticipants_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventParticipants" DROP CONSTRAINT "_EventParticipants_B_fkey";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "NoOrder";

-- DropTable
DROP TABLE "OrderBook";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserQuantities";

-- DropTable
DROP TABLE "YesOrder";

-- DropTable
DROP TABLE "_EventParticipants";
