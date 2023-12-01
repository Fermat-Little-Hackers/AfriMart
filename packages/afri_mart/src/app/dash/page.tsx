"use client";
import { useEffect, useState } from "react";
import Search from "@/components/market-place/search";
import SideFilter from "./components/sideFilter";
import UserDetails from "./components/userDetails";
import TrendingProducts from "../cart/components/trendingProducts";
import OurPartners from "@/components/market-place/ourPartners";
import Content from "./components/content";
import SelectCat from "./components/Selectcat";
import { type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { useConnectionContext } from "@/context/connectionContext";
import LoadingOverlay from "@/components/Loading";
import { useLoadingContext } from "@/context/connectionContext";

const Dashboard = () => {
  const [title, setTitle] = useState('All Purchases')
  const { ShareAddress, setShareAddress } = useConnectionContext()
  

  const props = (message: string) => {
    setTitle(message);
  };

  useEffect(() => {
    const connectToStarknet = async () => {
      let connection = await connect({ modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" })
      console.log(connection)
      if (connection && connection.isConnected) {
        setShareAddress(connection.selectedAddress)
      }
    }
    connectToStarknet()
  }, [])
  return (
    <div>
      {/* {loadState && <LoadingOverlay/>} */}
      <Search />
      <div className="m-0 p-8 md:px-20 w-[100vw] flex smx:flex-col lmx:flex-col space-x-24 smx:space-x-0 lmx:space-x-0 lmx:mx-auto lmx:w-[100%] smx:w-[100%]">
        <div>
          <UserDetails />
          <SideFilter onClickAction={props} />
        </div>
        <SelectCat onClickAction={props} />
        <div className="w-[100%] h-[100%]">
          <Content title={title} />
        </div>
      </div>
      <TrendingProducts />
      <OurPartners />
    </div>
  );
}

export default Dashboard;