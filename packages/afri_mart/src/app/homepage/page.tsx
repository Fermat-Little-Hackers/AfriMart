"use client";
import HomeSearch from "../../components/market-place/homesearch";
import Sidefilter from "./components/sidefilter";
import Filterdisplay from "./components/filterdisplay";
import Trendingbar from "./components/trendingbar";
import OurPartners from "@/components/market-place/ourPartners";
import { useState } from "react";
import SelectOption from "./components/selecttab";

const Homepage = () => {
  const [productTitle, setProductTitle] = useState("AGRICULTURE");
  const handleFilterClick = (message: string) => {
    setProductTitle(message);
  };

  return (
    <div>
        <HomeSearch />
        <div className='flex space-x-24 xlg:space-x-0 mmx:gap-[30px] smx:space-x-0 lmx:space-x-0 justify-center'>
        <Sidefilter onClickAction={handleFilterClick} />
        <Trendingbar />
      </div>
      <SelectOption onClickAction={handleFilterClick} />
      <Filterdisplay title={productTitle} />
      <OurPartners />
    </div>
  );
};

export default Homepage;
