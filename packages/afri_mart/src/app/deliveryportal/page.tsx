import React from "react";
// import {useState} from "react";
import Search from "@/components/market-place/search";
import SideMenu from "./components/SideMenu";
import PageContents from "./components/PageContents";
import OurPartners from "../../components/market-place/ourPartners";

const DeliveryPortal = () => {

  return (
    <div className="">
      <Search />
      <div className="px-5 md:px-20 w-[100vw]">
        <div className="flex flex-col md:flex-row gap-5 md:gap-20 mt-10 pb-24">
          <div className="md:w-[20%] w-[80%]">
            <SideMenu />
          </div>
          <div className="md:w-[80%] w-[100%] flex shadow-lg rounded-lg ring-1 ring-red-100 smx:w-[100%] smx:mx-auto gap-4">
            <PageContents />
          </div>
        </div>
      </div>
      <OurPartners />
    </div>
  );
};

export default DeliveryPortal;
