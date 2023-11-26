"use client";
import React, { useState } from "react";
import Search from "@/components/market-place/search";
import SideFilter from "./components/sideFilter";

export default function Home() {
  const [profileFeature, setprofileFeature] = useState("All Purchases");

  const handleFilterClick = (message: string) => {
    setprofileFeature;
  };
  return (
    <div>
      <Search />
      <div className="flex space-x-24 justify-center">
        <SideFilter onClickAction={handleFilterClick} />
      </div>
    </div>
  );
}
