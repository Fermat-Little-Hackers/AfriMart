"use client";
import React, { useState } from "react";
import Search from "@/components/market-place/search";
import SideFilter from "./components/sideFilter";
import AllPurchases from "./components/AllPurchases";
import UserDetails from "./components/userDetails";
import TrendingProducts from "../cart/components/trendingProducts";
import OurPartners from "@/components/market-place/ourPartners";

export default function Home() {
    const [title, setTitle] = useState('All Purchases')
  const props = (message: string) => {
    setTitle(message);
  };
  return (
    <div>
      <Search />
      <div className="flex smx:flex-col lmx:flex-col space-x-24 smx:space-x-0 lmx:space-x-0 lmx:mx-auto lmx:w-[100%] smx:w-[100%] justify-center">
        <div>
        <UserDetails />
        <SideFilter onClickAction={props} />
        </div>
        <AllPurchases title={title} />
      </div>
        <TrendingProducts />
        <OurPartners />
    </div>
  );
}
