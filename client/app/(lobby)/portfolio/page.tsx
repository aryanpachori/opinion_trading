"use client";
import React, { useCallback, useEffect, useState } from "react";


import Portfolio from "../../../components/landing/Portfolio";

import { Toaster } from "react-hot-toast";
import { getOrders } from "@/actions/portfolio/portfolio";

export interface Trade {
  id: string;
  userId: string;
  price: number;
  Quantity: number;
  Side: "YES" | "NO";
  type: "BUY" | "SELL";
  status: "EXECUTED" | "LIVE";
}

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [portfolioData, setPortfolioData] = useState<Trade[]>([]);

  const userId = "zcjz751lsvz9v8ba58loaqo5";

  useEffect(() => {
    if (userId) {
      getPortfolioDetails(userId);
    }
  }, []);

  const getPortfolioDetails = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const portfolio = await getOrders(userId);
      console.log("portfolio", portfolio);

      setPortfolioData(portfolio);
    } catch (e) {
      console.log("Error fetching portfolio", e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!portfolioData) {
    return <div>No portfolio found.</div>;
  }

  return (
    <div className="w-full h-screen">
      <Portfolio
        currentReturns={0}
        onExit={() => {}}
        trades={portfolioData.map((trade) => ({
          id: trade.userId,
          userId: trade.userId,
          price: trade.price,
          Quantity: trade.Quantity,
          Side: trade.Side,
          type: trade.type,
          status: trade.status,
        }))}
      />
      <Toaster position="top-center" />
    </div>
  );
};

export default Page;
