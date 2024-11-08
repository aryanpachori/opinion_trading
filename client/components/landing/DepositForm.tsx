"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Toaster, toast } from "react-hot-toast";
// import { recharge } from "@/actions/recharge/recharge";
// import { createOrder } from "@/actions/balance/order";
import axios from "axios";
import dotenv from "dotenv";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
dotenv.config();
const DepositForm = () => {
  const { data: session, status } = useSession();

 
  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

  
  const [depositAmount, setDepositAmount] = useState(0);
  const [summary, setSummary] = useState({
    rechargeAmount: 0,
    gst: 0,
    depositBalCredit: 0,
    promotionalBalCredit: 0,
    netBalance: 0,
  });

  useEffect(() => {
    const rechargeAmount = depositAmount;
    const gst = -(depositAmount * 0.18).toFixed(2);
    const depositBalCredit = Number((depositAmount - Math.abs(gst)).toFixed(2));
    const promotionalBalCredit = Math.abs(gst);
    const netBalance = depositAmount;

    setSummary({
      rechargeAmount,
      gst,
      depositBalCredit,
      promotionalBalCredit,
      netBalance,
    });
  }, [depositAmount]);

  const handleQuickAdd = (amount: number) => {
    setDepositAmount((prev) => prev + amount);
  };

  async function handleRechageClick() {
    const userId = session?.user?.id;
    //  const orderId = await createOrder(depositAmount , userId)

    //console.log(orderId);
    if (depositAmount <= 0) {
      toast.error("amount should be greater than zero");
      return;
    }

    const isRechargeDone = await axios.post(
      ` http://localhost:3000/v1/user/recharge`,
      {
        userId,
        amount: depositAmount,
      }
    );
    if (isRechargeDone.status == 200) {
      toast.success("Recharge Success");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast.error("Error While Recharing");
    }
  }

  return (
    <div className="mx-auto p-4 w-full flex justify-center ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-2 px-">
          <h1 className="text-3xl font-bold px-7 pt-5">Deposit</h1>
          <CardContent className="pt-6">
            <Label htmlFor="depositAmount">Deposit amount</Label>
            <Input
              id="depositAmount"
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              className="mb-4"
            />
            <div className="flex space-x-2 mb-4">
              <Button variant="outline" onClick={() => handleQuickAdd(250)}>
                +250
              </Button>
              <Button variant="outline" onClick={() => handleQuickAdd(500)}>
                +500
              </Button>
              <Button variant="outline" onClick={() => handleQuickAdd(1000)}>
                +1000
              </Button>
            </div>
            <Button
              className="w-full"
              variant="default"
              onClick={handleRechageClick}
            >
              Recharge
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SUMMARY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Recharge amount</span>
                <span>₹{summary.rechargeAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST applicable</span>
                <span className="text-red-500">₹{summary.gst}</span>
              </div>
              <div className="flex justify-between">
                <span>Deposit bal. credit</span>
                <span>₹{summary.depositBalCredit}</span>
              </div>
              <div className="flex justify-between">
                <span>Promotional bal. credit</span>
                <span className="text-green-500">
                  + ₹{summary.promotionalBalCredit.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-green-500">🎉 Recharge Cashback</div>
              <div className="pt-2 border-t flex justify-between font-bold">
                <span>Net Balance</span>
                <span>₹{summary.netBalance.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default DepositForm;
