"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Trade } from "@/app/(lobby)/portfolio/page";

interface PortfolioProps {
  currentReturns: number;
  trades: Trade[];
  onExit: (trade: Trade) => void;
}

export default function Portfolio({
  currentReturns,
  trades,
  onExit,
}: PortfolioProps) {
  const [activeSection, setActiveSection] = useState<"trades" | "pending">(
    "trades"
  );

  const activeTrades = trades.filter(
    (trade) => trade.status === "LIVE" && trade.type === "BUY"
  );
  const pastTrades = trades.filter(
    (trade) => trade.status === "EXECUTED" && trade.type === "SELL"
  );
  const pendingBuy = trades.filter(
    (trade) => trade.status === "LIVE" && trade.type === "SELL"
  );
  const pendingSell = trades.filter(
    (trade) => trade.status === "EXECUTED" && trade.type === "BUY"
  );

  return (
    <div className="min-h-screen  text-white p-4">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Your Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-lg font-semibold">Current Returns</p>
            <p
              className={`text-3xl font-bold ${
                currentReturns >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {currentReturns >= 0 ? "+" : "-"}₹
              {Math.abs(currentReturns).toFixed(2)}
              {currentReturns >= 0 ? (
                <ArrowUpIcon className="inline ml-2 h-6 w-6" />
              ) : (
                <ArrowDownIcon className="inline ml-2 h-6 w-6" />
              )}
            </p>
          </div>

          {/* Toggle Buttons for Sections */}
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              onClick={() => setActiveSection("trades")}
              variant={activeSection === "trades" ? "default" : "outline"}
            >
              Trades
            </Button>
            <Button
              onClick={() => setActiveSection("pending")}
              variant={activeSection === "pending" ? "default" : "outline"}
            >
              Pending Orders
            </Button>
          </div>

          {/* Active and Past Trades Section */}
          {activeSection === "trades" && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Active & Past Trades
              </h3>
              <div className="space-y-4">
                {activeTrades.length > 0 ? (
                  activeTrades.map((trade) => (
                    <Card
                      key={trade.id}
                      className="bg-gray-800 border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              {trade.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                              Price: ₹{trade.price.toFixed(2)} | Quantity:{" "}
                              {trade.Quantity}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded ${
                                trade.Side === "YES"
                                  ? "bg-blue-500 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {trade.Side.toUpperCase()}
                            </span>
                            <Button
                              onClick={() => {
                                onExit(trade);
                              }}
                              variant="destructive"
                              size="sm"
                              className="bg-red-600 hover:bg-gray-600 text-white rounded-full px-4"
                            >
                              Exit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">No active trades.</p>
                )}
                {pastTrades.length > 0 ? (
                  pastTrades.map((trade) => (
                    <Card
                      key={trade.id}
                      className="bg-gray-800 border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              {trade.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                              Price: ₹{trade.price.toFixed(2)} | Quantity:{" "}
                              {trade.Quantity}
                            </p>
                            <p
                              className={`text-sm font-semibold ${
                                trade.price !== null && trade.price >= 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              Gain/Loss:{" "}
                              {trade.price !== null
                                ? trade.price >= 0
                                  ? "+"
                                  : "-"
                                : ""}
                              ₹{Math.abs(trade.price || 0).toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded ${
                                trade.Side === "YES"
                                  ? "bg-blue-500 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {trade.Side.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">No past trades.</p>
                )}
              </div>
            </div>
          )}

          {/* Pending Orders Section */}
          {activeSection === "pending" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Pending Orders</h3>
              <div className="space-y-4">
                {pendingBuy.length > 0 &&
                  pendingBuy.map((trade) => (
                    <Card
                      key={trade.id}
                      className="bg-gray-800 border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              {trade.title}
                            </h3>
                            <p className="text-sm text-gray-400">
                              Price: ₹{trade.price.toFixed(2)} | Quantity:{" "}
                              {trade.Quantity}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                          <span
                              className={`text-sm font-medium px-2 py-1 rounded ${
                                trade.Side === "YES"
                                  ? "bg-blue-500 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {trade.Side.toUpperCase()}
                            </span>
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded ${
                                trade.type === "BUY"
                                  ? "bg-red-500 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                            >
                              {trade.type.toUpperCase() == "BUY" ? "SELL" : "BUY"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {pendingSell.length > 0 ? (
                  pendingSell.map((trade) => (
                    <Card
                      key={trade.id}
                      className="bg-gray-800 border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">
                              {trade.title}
                            </h3>

                            <p className="text-sm text-gray-400 ">
                              Price: ₹{trade.price.toFixed(2)} | Quantity:{" "}
                              {trade.Quantity}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                          <span
                              className={`text-sm font-medium px-2 py-1 rounded ${
                                trade.Side === "YES"
                                  ? "bg-blue-500 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {trade.Side.toUpperCase()}
                            </span>
                            <span
                              className={`text-sm font-medium px-2 py-1 rounded p-2  ${
                                trade.type === "BUY"
                                  ? "bg-red-500 text-white"
                                  : "bg-green-500 text-white"
                              }`}
                            >
                              {trade.type.toUpperCase() == "BUY" ? "SELL" : "BUY"}
                            </span>
                            
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-400 text-center">
                    No pending sell orders.
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
