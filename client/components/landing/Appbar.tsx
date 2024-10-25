"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NavigationMenu } from "./Navmenu";
import ProfileHeader from "./ProfileHeader";
import { Wallet } from "lucide-react";
import { getBalance } from "@/actions/balance/balance";

interface navMenutItemType {
  title: string;
  link: string;
}

export default function Appbar() {
  const [balance, setBalance] = useState(0);
  const userId = "zcjz751lsvz9v8ba58loaqo5";
  useEffect(() => {
    async function loadBal() {
      const bal = await getBalance(userId);
      setBalance(bal);
    }
    loadBal();
  }, []);
  const navMenutItem: Array<navMenutItemType> = [
    { title: "Events", link: "/event" },
    { title: "Portfolio", link: "/portfolio" },
    { title: "Recharge", link: "/event/recharge" },
  ];

  return (
    <nav className="inset-x-0 top-0 backdrop-blur-2xl z-50 border-y-2 shadow-md sticky">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* LeftNav */}
          <Link
            className="flex items-center text-4xl font-bold text-white group"
            href={"/"}
          >
            <span>opini</span>
            <span className="duration-700 group-hover:-rotate-180">X</span>
          </Link>

          {/* NavMenu */}
          <nav className="hidden md:flex gap-10">
            {navMenutItem.map((item, index) => (
              <NavigationMenu title={item.title} link={item.link} key={index} />
            ))}
          </nav>
          {/* ProfileHeader */}
          <div className="flex gap-3 items-center">
            {" "}
            <button className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:text-white border rounded pr-4 pf-4 pt-2 pb-2 flex items-center space-x-2">
              <Wallet className="h-5 w-5 ml-3" />
              <span className="font-mono">₹ {balance}</span>
            </button>
            <ProfileHeader />
          </div>
        </div>
      </div>
    </nav>
  );
}
