"use client"
import Link from "next/link";
import React from 'react';
type NavigationMenuProps = {
    title: string;
    link: string;
}
export const NavigationMenu = ({title, link}:NavigationMenuProps) => {
  return (
    <Link
    className="font-medium text-xl flex items-center"
    href={link}
  >
    {title}
  </Link>
  )
}