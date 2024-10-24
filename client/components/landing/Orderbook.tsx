"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from "../ui/line-chart";
import { getEventDetails } from "@/actions/Event/getEventDetails";
import { ArrowUpDown } from "lucide-react";

import { useSession } from "next-auth/react";

import { toast, Toaster } from "react-hot-toast";

interface OrderBookItem {
  id: string;
  createdAt: Date;
  orderBookId: string;
  price: number;
  quantity: number;
}

interface OrderBookData {
  yes: OrderBookItem[];
  no: OrderBookItem[];
  topPriceYes: number;
  topPriceNo: number;
}

interface WebSocketData {
  orderbook: OrderBookData;
  topPriceYes: number;
  topPriceNo: number;
}

interface OrderBookProps {
  eventId: string;
}

export default function OrderBook({ eventId }: OrderBookProps) {
  const { data } = useSession();
  const [orderBookData, setOrderBookData] = useState<OrderBookData | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [yesPrice, setYesPrice] = useState<number>(0);
  const [noPrice, setNoPrice] = useState<number>(0);
  const [showYesData, setShowYesData] = useState<boolean>(true);
  const [yesProbability, setYesProbability] = useState<number[]>([]);
  const [noProbability, setNoProbability] = useState<number[]>([]);
  const [timeSeries, setTimeSeries] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [tradePrice, setTradePrice] = useState("");
  const [tradeQuantity, setTradeQuantity] = useState("");

  useEffect(() => {
    async function fetchInitialData() {
      const eventData = await getEventDetails(eventId);
      setTitle(eventData.title);
      setDescription(eventData.description);
    }
    fetchInitialData();
  }, [eventId]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      ws.send(JSON.stringify({ eventId }));
    };
    ws.onmessage = (event: MessageEvent) => {
      const data: WebSocketData = JSON.parse(event.data);
      setOrderBookData(data.orderbook);
      setYesPrice(data.orderbook.topPriceYes);
      setNoPrice(data.orderbook.topPriceNo);
      const newYesProb = (data.orderbook.topPriceYes / 10) * 100;
      const newNoProb = (data.orderbook.topPriceNo / 10) * 100;
      setYesProbability((prev) => [...prev, newYesProb]);
      setNoProbability((prev) => [...prev, newNoProb]);
      setTimeSeries((prev) => [...prev, new Date().toLocaleTimeString()]);
    };
    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket connection closed");
    setSocket(ws);
    return () => ws.close();
  }, [eventId]);

  const getBarWidth = (quantity: number, maxQuantity: number) => {
    return `${Math.min((quantity / maxQuantity) * 100, 100)}%`;
  };
  async function handleTrade() {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_PREFIX_URL}/v1/order/place-order`,
      {
        userId: data?.user.id,
        eventId: eventId,
        side: side,
        quantity: tradeQuantity,
        price: tradePrice,
      }
    );
    if (response.status === 200) {
      toast.success("Order placed successfully!");
    } else {
      toast.error("Error placing order!");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6 mt-1">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 bg-black border border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Order Book</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-800">
                  <TableHead className="text-white font-sans">PRICE</TableHead>
                  <TableHead className="text-white font-sans">
                    QTY AT YES
                  </TableHead>
                  <TableHead className="text-white font-sans">PRICE</TableHead>
                  <TableHead className="text-white font-sans">
                    QTY AT NO
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBookData && orderBookData.yes && orderBookData.no ? (
                  (() => {
                    const yesItems = orderBookData.yes
                      .filter((item) => item.price >= orderBookData.topPriceYes)
                      .sort((a, b) => a.price - b.price)
                      .slice(0, 5);
                    const noItems = orderBookData.no
                      .filter((item) => item.price >= orderBookData.topPriceNo)
                      .sort((a, b) => a.price - b.price)
                      .slice(0, 5);
                    const maxYesQuantity = Math.max(
                      ...yesItems.map((item) => item.quantity)
                    );
                    const maxNoQuantity = Math.max(
                      ...noItems.map((item) => item.quantity)
                    );

                    return yesItems.map((yesItem, index) => {
                      const noItem = noItems[index];
                      return (
                        <TableRow
                          key={index}
                          className="border-b border-gray-800"
                        >
                          <TableCell className="text-blue-500 font-semibold">
                            {yesItem.price}
                          </TableCell>
                          <TableCell className="p-0">
                            <div className="relative h-full w-full">
                              <div
                                className="absolute top-0 left-0 h-full bg-blue-700 opacity-20"
                                style={{
                                  width: getBarWidth(
                                    yesItem.quantity,
                                    maxYesQuantity
                                  ),
                                }}
                              ></div>
                              <div className="relative p-4 text-blue-500">
                                {yesItem.quantity}
                              </div>
                            </div>
                          </TableCell>
                          {noItem && (
                            <>
                              <TableCell className="text-red-500">
                                {noItem.price}
                              </TableCell>
                              <TableCell className="p-0">
                                <div className="relative h-full w-full">
                                  <div
                                    className="absolute top-0 left-0 h-full bg-red-700 opacity-20"
                                    style={{
                                      width: getBarWidth(
                                        noItem.quantity,
                                        maxNoQuantity
                                      ),
                                    }}
                                  ></div>
                                  <div className="relative p-4 text-red-500">
                                    {noItem.quantity}
                                  </div>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      );
                    });
                  })()
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Loading order book...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="bg-black border border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Place Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <Button
                variant={side === "yes" ? "default" : "outline"}
                onClick={() => setSide("yes")}
                className={`bg-blue-500 text-white hover:bg-blue-600 ${
                  side === "yes" ? "ring-2 ring-blue-400" : ""
                }`}
              >
                Yes ₹{yesPrice}
              </Button>
              <Button
                variant={side === "no" ? "default" : "outline"}
                onClick={() => setSide("no")}
                className={`bg-red-500 text-white hover:bg-red-600 ${
                  side === "no" ? "ring-2 ring-red-400" : ""
                }`}
              >
                No ₹{noPrice}
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="trade-price"
                  className="block text-sm font-medium text-white"
                >
                  Price
                </label>
                <Input
                  id="trade-price"
                  type="number"
                  value={tradePrice}
                  onChange={(e) => setTradePrice(e.target.value)}
                  className="mt-1 bg-gray-900 text-white border-gray-700"
                />
                <p className="text-sm text-gray-400">0 qty available</p>
              </div>
              <div>
                <label
                  htmlFor="trade-quantity"
                  className="block text-sm font-medium text-white"
                >
                  Quantity
                </label>
                <Input
                  id="trade-quantity"
                  type="number"
                  value={tradeQuantity}
                  onChange={(e) => setTradeQuantity(e.target.value)}
                  className="mt-1 bg-gray-900 text-white border-gray-700"
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-bold">₹{yesPrice}</p>
                  <p className="text-sm text-gray-400">You put</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-500">
                    ₹{yesPrice + noPrice - yesPrice}
                  </p>
                  <p className="text-sm text-gray-400">You get</p>
                </div>
              </div>
              <Button
                onClick={handleTrade}
                className={`w-full text-white ${
                  side === "yes"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Place order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 bg-black border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            Probability Chart
            <Button
              onClick={() => setShowYesData(!showYesData)}
              className={
                showYesData
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              {showYesData ? "Show No Data" : "Show Yes Data"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            labels={timeSeries}
            data={showYesData ? yesProbability : noProbability}
            borderColor={
              showYesData ? "rgba(59, 130, 246, 1)" : "rgba(220, 38, 38, 1)"
            }
          />
        </CardContent>
      </Card>

      <Card className="mt-8 bg-black border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Event Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{description}</p>
        </CardContent>
      </Card>
      <Toaster position="top-center" />
    </div>
  );
}
