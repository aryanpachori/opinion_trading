"use client";
import React, { useCallback, useEffect, useState } from "react";

import Portfolio from "../../../components/landing/Portfolio";

import toast, { Toaster } from "react-hot-toast";
import { getOrders } from "@/actions/portfolio/portfolio";
import axios from "axios";

export interface Trade {
  id: string;
  userId: string;
  price: number;
  Quantity: number;
  Side: "YES" | "NO";
  type: "BUY" | "SELL";
  status: "EXECUTED" | "LIVE";
  eventId: string;
}

const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [portfolioData, setPortfolioData] = useState<Trade[]>([]);

  const userId = "ffdmpaw1n3772yei1pc8icqm";

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
  async function handleExit(trade: Trade) {
    const { id, price, Quantity, eventId, Side, userId } = trade;
    const response = await axios.post(
      "http://localhost:3000/v1/event/exit",
      {
        userId,
        eventId,
        orderId: id,
        side : Side,
        price,
        quantity :Quantity,
      }
    );
    if(response.status === 200){
      toast.success("Order processed succesfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }else{
      toast.error("Error processing order")
    }
  }

  return (
    <div className="w-full h-screen">
      <Portfolio
        currentReturns={0}
        onExit={handleExit}
        trades={portfolioData.map((trade) => ({
          id: trade.id,
          userId: trade.userId,
          price: trade.price,
          Quantity: trade.Quantity,
          Side: trade.Side,
          type: trade.type,
          status: trade.status,
          eventId: trade.eventId,
        }))}
      />
      <Toaster position="top-center" />
    </div>
  );
};

export default Page;
