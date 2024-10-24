"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Portfolio from "../../../components/landing/Portfolio";

import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export interface Trade {
  id: string;
  createdAt: Date;
  portfolioId: string;
  eventId: string;
  price: number;
  quantity: number;
  side: "YES" | "NO";
  title?: string;
  gainloss: number | null;
  status: "ACTIVE" | "PAST";
}
export interface Portfolio {
  id: string;
  userId: string;
  currentBalances: number;
  createdAt: Date;
  updatedAt: Date;
  trades: Trade[];
}
const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [portfolioData, setPortfolioData] = useState<Portfolio | null>(null);
  const [tradesWithTitles, setTradesWithTitles] = useState<Trade[]>([]);

  const { data } = useSession();
  console.log(data?.user);

  const userId = "";

  useEffect(() => {
    if (userId) {
      getPortfolioDetails(userId);
    }
  }, []);

  const { status } = useSession();

  const getPortfolioDetails = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const portfolio = ""
      console.log("portfolio", portfolio);

      setPortfolioData(portfolio);
      if (portfolio) {
        const updatedTrades = await fetchTitles(portfolio.trades);
        setTradesWithTitles(updatedTrades);
      }
    } catch (e) {
      console.log("Error fetching portfolio", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/api/auth/signin");
    }
    if (status === "authenticated" && userId) {
      getPortfolioDetails(userId);
    }
  }, [status, userId, getPortfolioDetails]);

 
  const handleExit = async (tradeId: string) => {
    if (window.confirm("Are you sure you want to sell your order")) {
      try {
        const tradeToSell = tradesWithTitles.find(
          (trade) => trade.id == tradeId
        );
        if (tradeToSell) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_PREFIX_URL}/v1/order/sell-order`,
            {
              tradeId: tradeToSell.id,
              eventId: tradeToSell.eventId,
              price: tradeToSell.price,
              quantity: tradeToSell.quantity,
              side: tradeToSell.side == "YES" ? "yes" : "no",
            }
          );
          toast.success(response.data.message || "Order sold successfully!");
        } else {
          toast.error("Trade not found.");
        }
      } catch (error) {
        console.error("Error selling order", error);
        toast.error("Failed to sell order.");
      }
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!portfolioData) {
    return <div>No portfolio found.</div>;
  }
  const { currentBalances } = portfolioData;

  return (
    <div className="w-full h-screen">
      <Portfolio
        currentReturns={currentBalances}
        onExit={handleExit}
        trades={tradesWithTitles.map((trade) => ({
          id: trade.id,
          title: trade.title || "Unknown Title",
          price: trade.price,
          quantity: trade.quantity,
          type: trade.side,
          gainloss: trade.gainloss,
          status: trade.status,
        }))}
      />
      <Toaster position="top-center" />
    </div>
  );
};

export default Page;
