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
        <div className="flex flec-row gap-10 mx-20 mt-10">
          <div className="w-[20vw]">
            <SideMenu />
          </div>
          <div className="w-[80vw]">
            <PageContents />
          </div>
        </div>
      <OurPartners />
    </div>
  );
};

export default DeliveryPortal;
