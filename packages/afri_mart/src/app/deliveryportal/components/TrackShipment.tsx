import React, { useState, useEffect } from "react";
import {
  connect,
  type ConnectedStarknetWindowObject,
} from "@argent/get-starknet";
import contractAbi from "../../../ABI/supplyChainFactory.json";

import { FaShoppingCart, FaUser, FaBars, FaSearch } from "react-icons/fa";
import { CairoCustomEnum, CairoEnum, Contract, Provider } from "starknet";
import { SupplyChainFactoryAddr } from "@/components/addresses";
import { useAccountContext } from "@/context/connectionContext";
import { useAppContext } from '@/context/provider'


const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [location, setLocation] = useState<OrderLocation>();
  const [preLocations, setPreLocation] = useState("");
  const [curLocation, setCurrentLocation] = useState("");
  const [next, setNext] = useState("");
  const {factoryContractRead} = useAppContext();


  function hexToReadableText(hexString: any): string {
    const bytes = Buffer.from(hexString, "hex");
    const text = new TextDecoder("utf-8").decode(bytes);
    return text;
  }

  interface OrderLocation {
    orderID: Number;
    deliveryStatus: CairoCustomEnum;
    previousLocation: string;
    currentLocation: string;
    nextStop: string;
  }

  const manageTrackingNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTrackingNumber(e.target.value);
  };

  const startSearch = async () => {
    try {
      let loc = await factoryContractRead.trackeItem(trackingNumber);
      setLocation(loc);

      let result = hexToReadableText(loc.previousLocation.toString(16));
      let result2 = hexToReadableText(loc.currentLocation.toString(16));
      let result3 = hexToReadableText(loc.nextStop.toString(16));
      setPreLocation(result);
      setCurrentLocation(result2);
      setNext(result3);
      // console.log("previous location is", location?.previousLocation);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
      <h3 className="mb-5 md:mb-7 text-4xl text-bold font-semibold md:text-2xl mx-20 my-10">Track Shipment</h3>
      <div className="justify-start p-5 md:p-10 text-left">
        <div className="flex items-center border-0 w-full md:w-[30rem] h-10 p-5 md:p-5 pr-0 md:pl-5 md:pr-0 rounded-3xl mx-20 ring-1 ring-[var(--terracota)]">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Tracking Number"
            onChange={(e) => manageTrackingNumber(e)}
            className="outline-none focus:outline-none w-full md:w-[100%] mr-4 md:mr-6 bg-transparent"
          />
          <button
            type="button"
            className=" bg-gray-600 text-white px-2 md:px-4 py-2 rounded-3xl flex items-center"
            onClick={startSearch}
          >
            <FaSearch className="mr-2" /> Track
          </button>
        </div>

        <div className="flex flex-row h-[15rem] gap-5 mx-20 mt-7">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Location Info</h1>
            <p>Order ID: {trackingNumber}</p>
            <p>Delivery Status: {location?.deliveryStatus.activeVariant()}</p>
            <p>Previous Location: {preLocations}</p>
            <p>Current Location: {curLocation}</p>
            <p>Next Stop: {next}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackShipment;
