import { SupplyChainContractAddr } from "@/components/addresses";
import React, { useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { CairoCustomEnum, Contract } from "starknet";
import { connect } from "@argent/get-starknet";
import { ConnectedStarknetWindowObject } from "get-starknet-core";
import contractAbi from "../../../ABI/supplyChainContract.json";
import { useAccountContext } from "@/context/connectionContext";
import { useAppContext } from '@/context/provider'




const UpdateShipment = () => {
  const [OrderId, setOrderId] = useState<any>();
  const [NextStop, setNextStop] = useState<any>();
  const [CurrentStatus, setCurrentStatus] = useState<CairoCustomEnum>();
  const {account} = useAppContext();



  const handleOrderId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const handleNextStop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextStop(e.target.value);
  };

  const handleCurrentStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {

    if (e.target.value == "Processing") {
      const processing = new CairoCustomEnum({
        Processing: "Processing",
        Shipped: undefined,
        Arrived: undefined,
        Enroute: undefined,
        Delivered: undefined,
        Cancelled: undefined,
      });
      setCurrentStatus(processing);
    } else if (e.target.value == "Shipped") {
      const shipped = new CairoCustomEnum({
        Processing: undefined,
        Shipped: "Shipped",
        Arrived: undefined,
        Enroute: undefined,
        Delivered: undefined,
        Cancelled: undefined,
      });
      setCurrentStatus(shipped);
    } else if (e.target.value == "Arrived") {
      const arrived = new CairoCustomEnum({
        Processing: undefined,
        Shipped: undefined,
        Arrived: "Arrived",
        Enroute: undefined,
        Delivered: undefined,
        Cancelled: undefined,
      });
      setCurrentStatus(arrived);
    } else if (e.target.value == "Enroute") {
      const enroute = new CairoCustomEnum({
        Processing: undefined,
        Shipped: undefined,
        Arrived: undefined,
        Enroute: "Enroute",
        Delivered: undefined,
        Cancelled: undefined,
      });
      setCurrentStatus(enroute);
    } else if (e.target.value == "Delivered") {
      const delivered = new CairoCustomEnum({
        Processing: undefined,
        Shipped: undefined,
        Arrived: undefined,
        Enroute: undefined,
        Delivered: "Delivered",
        Cancelled: undefined,
      });
      setCurrentStatus(delivered);
    } else if (e.target.value == "Cancelled") {
      const cancelled = new CairoCustomEnum({
        Processing: undefined,
        Shipped: undefined,
        Arrived: undefined,
        Enroute: undefined,
        Delivered: undefined,
        Cancelled: "Cancelled",
      });
      setCurrentStatus(cancelled);
    } else {
      const _ = new CairoCustomEnum({
        Processing: undefined,
        Shipped: undefined,
        Arrived: undefined,
        Enroute: undefined,
        Delivered: undefined,
        Cancelled: undefined,
        Default: "No selection",
      });
      setCurrentStatus(_);
    }
    console.log(CurrentStatus);
  };


  const updateShipment: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("Updating Shipment......");
    try {
      const contract = new Contract(
        contractAbi,
        SupplyChainContractAddr(),
        account
      );
      await contract.update_shipment(OrderId, NextStop, CurrentStatus);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
      <h3 className="mb-5 md:mb-7 text-4xl text-bold font-semibold md:text-2xl mx-20 my-10">Update Shipment</h3>
      <div className="justify-start text-left">
        <form
          onSubmit={updateShipment}
          className="p-5 md:p-20 rounded w-full"
        >
          <div className="mb-4">
            <label
              htmlFor="OrderId"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Order ID
            </label>
            <input
              type="number"
              name="OrderId"
              id="OrderId"
              value={OrderId}
              onChange={handleOrderId}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="NextStop"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Next Stop
            </label>
            <input
              type="String"
              name="NextStop"
              id="NextStop"
              value={NextStop}
              onChange={handleNextStop}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="CurrentStatus"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Current Status:
            </label>
              <select 
                id="CurrentStatus" 
                name="CurrentStatus"
                onChange={(e) => handleCurrentStatus(e)}
                className="block bg-transparent w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-[var(--terracota)] placeholder:text-gray-400  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Arrived">Arrived</option>
                <option value="Enroute">Enroute</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            >
              Update Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateShipment;
