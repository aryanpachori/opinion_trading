"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface Trade {
  id: string;
  title: string;
  price: number;
  quantity: number;
  type: "YES" | "NO";
  gainloss: number | null;
  status: "ACTIVE" | "PAST";
}
interface PortfolioProps {
  currentReturns: number;
  trades: Trade[];
  onExit: (id: string) => void;
}
export default function Portfolio({
  currentReturns,
  trades,
  onExit,
}: PortfolioProps) {
  const activeTrades = trades.filter((trade) => trade.status == "ACTIVE");
  const pastTrades = trades.filter((trade) => trade.status == "PAST");

  return (
    <div className="min-h-screen bg-black text-white p-4">
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
              className={`text-3xl font-bold ${currentReturns >= 0 ? "text-green-500" : "text-red-500"}`}
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
          {/* Active Trades Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Active Trades</h3>
            <div className="space-y-4">
              {activeTrades.length > 0 ? (
                activeTrades.map((trade) => (
                  <Card key={trade.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            {trade.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Price: ₹{trade.price.toFixed(2)} | Quantity:{" "}
                            {trade.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded ${
                              trade.type === "YES"
                                ? "bg-blue-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {trade.type.toUpperCase()}
                          </span>
                          <Button
                            onClick={() => {
                              onExit(trade.id);
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
            </div>
          </div>

          {/* Past Trades Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Past Trades</h3>
            <div className="space-y-4">
              {pastTrades.length > 0 ? (
                pastTrades.map((trade) => (
                  <Card key={trade.id} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            {trade.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Price: ₹{trade.price.toFixed(2)} | Quantity:{" "}
                            {trade.quantity}
                          </p>
                          <p
                            className={`text-sm font-semibold ${trade.gainloss !== null && trade.gainloss >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            Gain/Loss:{" "}
                            {trade.gainloss !== null
                              ? trade.gainloss >= 0
                                ? "+"
                                : "-"
                              : ""}
                            ₹{Math.abs(trade.gainloss || 0).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`text-sm font-medium px-2 py-1 rounded ${
                              trade.type === "YES"
                                ? "bg-blue-500 text-white"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {trade.type.toUpperCase()}
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
        </CardContent>
      </Card>
    </div>
  );
}
