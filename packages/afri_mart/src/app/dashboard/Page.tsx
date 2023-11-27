"use client";
import React, { useState } from "react";
import Search from "@/components/market-place/search";
import SideFilter from "./components/sideFilter";
import UserDetails from "./components/userDetails";
import TrendingProducts from "../cart/components/trendingProducts";
import OurPartners from "@/components/market-place/ourPartners";
import Content from "./components/content";
import SelectCat from "./components/Selectcat";

export default function Home() {
    const [title, setTitle] = useState('All Purchases')
  const props = (message: string) => {
    setTitle(message);
  };
  return (
    <div>
      <Search />
      <div className=" px-5 md:px-20 w-[100vw] flex smx:flex-col lmx:flex-col space-x-24 smx:space-x-0 lmx:space-x-0 lmx:mx-auto lmx:w-[100%] smx:w-[100%]">
        <div>
        <UserDetails />
        <SideFilter onClickAction={props} />
        </div>
        <SelectCat onClickAction={props}/>
        <div className="w-[100%]">
            <Content title={title} />
        </div>
      </div>
        <TrendingProducts />
        <OurPartners />
    </div>
  );
}
