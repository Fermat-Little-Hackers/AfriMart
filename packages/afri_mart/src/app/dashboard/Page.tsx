"use client";
import React, { useState } from "react";
import Search from "@/components/market-place/search";
import SideFilter from "./components/sideFilter";
import AllPurchases from "./components/AllPurchases";
import UserDetails from "./components/userDetails";

export default function Home() {
    const [title, setTitle] = useState('All Purchases')
  const props = (message: string) => {
    setTitle(message);
  };
  return (
    <div>
      <Search />
      <div className="flex space-x-24 justify-center">
        <div>
        <UserDetails />
        <SideFilter onClickAction={props} />
        </div>
        <AllPurchases title={title} />
      </div>
    </div>
  );
}
