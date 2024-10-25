"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ProfileHeader = () => {
  const { data } = useSession();
  
  return (
    <div className="flex items-center gap-4">
      <Link href={!data?.user ? "/api/auth/signin" : "/event"}>
        <Button className="justify-center flex items-center whitespace-nowrap transition duration-200 ease-in-out font-medium rounded px-7 py-6 text-xl ">
          {!data?.user ? "Login/Signup" : "Trade Now"}
        </Button>
      </Link>
    </div>
  );
};

export default ProfileHeader;
