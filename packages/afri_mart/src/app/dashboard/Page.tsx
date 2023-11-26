"use client";
import React, { useState } from "react";
import Search from "@/components/market-place/search";
import SideFilter from "./components/sideFilter";

import AllPurchases from "./components/AllPurchases";

export default function Home() {
  const props = (message: string) => {};
  return (
    <div>
      <Search />
      <div className="flex space-x-24 justify-center">
        <SideFilter onClickAction={props} />
        <AllPurchases />
      </div>
    </div>
  );
}
