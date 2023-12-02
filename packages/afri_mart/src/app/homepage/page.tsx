"use client";
import HomeSearch from "../../components/market-place/homesearch";
import Sidefilter from "./components/sidefilter";
import Filterdisplay from "./components/filterdisplay";
import Trendingbar from "./components/trendingbar";
import OurPartners from "@/components/market-place/ourPartners";
import { useEffect, useState } from "react";
import SelectOption from "./components/selecttab";
import TrendingProducts from "../cart/components/trendingProducts";
import LoadingOverlay from "@/components/Loading";
import { useLoadingContext } from "@/context/connectionContext";


const Homepage = () => {
  const [productTitle, setProductTitle] = useState("AGRICULTURE");
  const [enumOption, setEnumOption] = useState(0);
  const {ShareLoad, setShareLoad} = useLoadingContext();

  const handleFilterClick = (message: string, option: number) => {
    setProductTitle(message);
    setEnumOption(option)
  };

  useEffect(() => {
    setShareLoad(true)
  }, [])
  

  return (
    <div>
       {ShareLoad && <LoadingOverlay/>}
        <HomeSearch />
        <SelectOption onClickAction={handleFilterClick} />
        <div className='flex space-x-24 xlg:space-x-0 mmx:gap-[30px] smx:space-x-0 lmx:space-x-0 justify-center md:px-10 lg:px-20'>
        <Sidefilter onClickAction={handleFilterClick} />
        <Filterdisplay title={productTitle} enumoption={enumOption} />
      </div>
        <TrendingProducts />
      <OurPartners />
    </div>
  );
};

export default Homepage;
