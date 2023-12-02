"use client";
import HomeSearch from "../../components/market-place/homesearch";
import Sidefilter from "./components/sidefilter";
import Filterdisplay from "./components/filterdisplay";
import Trendingbar from "./components/trendingbar";
import OurPartners from "@/components/market-place/ourPartners";
import { useState } from "react";
import SelectOption from "./components/selecttab";
import TrendingProducts from "../cart/components/trendingProducts";
import Search from "@/components/market-place/search";

const Homepage = () => {
  const [productTitle, setProductTitle] = useState("AGRICULTURE");
  const [enumOption, setEnumOption] = useState(1);
  const handleFilterClick = (message: string, option: number) => {
    setProductTitle(message);
    setEnumOption(option)
  };

  return (
    <div>
        <Search />
        <SelectOption onClickAction={handleFilterClick} />
        <div className='flex space-x-24 xlg:space-x-0 mmx:gap-[20px] md:mt-10 md:mb-14 smx:space-x-0 lmx:space-x-0 md:px-10 lg:px-20'>
        <div className="md:w-[20%]">
          <Sidefilter onClickAction={handleFilterClick} />
        </div>
        <div className="md:w-[80%]">
          <Filterdisplay title={productTitle} enumoption={enumOption} />
        </div>
      </div>
        <TrendingProducts />
      <OurPartners />
    </div>
  );
};

export default Homepage;
