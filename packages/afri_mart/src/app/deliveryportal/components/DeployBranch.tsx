import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Contract, Provider, constants } from "starknet";
import {
  type ConnectedStarknetWindowObject,
  connect,
  disconnect,
} from "@argent/get-starknet";

import contractAbi from "../../../ABI/supplyChainFactory.json";
import { SupplyChainFactoryAddr } from "@/components/addresses";
import { useAccountContext } from "@/context/connectionContext";
import { useAppContext } from '@/context/provider'


const DeployBranch = () => {
  const [connection, setConnection] =
    useState<ConnectedStarknetWindowObject | null>();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const {factoryContractWrite} = useAppContext();


  const deployBranch = async () => {
    try {

      await factoryContractWrite.createBranch(city, state, country);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle the form submission logic (e.g., send data to server)
    // setSubmittedData(data);
    deployBranch();
    console.log("submitted");
    // console.log(previewImage);
    // console.log(name);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <div className="">
      <h3 className="mb-5 md:mb-7 text-4xl text-bold font-semibold md:text-2xl mx-20 my-10">Create a new branch</h3>
      <div className="justify-start text-left ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 md:p-20 rounded"
        >
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-black text-sm font-semibold mb-2"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={handleCity}
              className="w-full p-2 bg-transparent rounded-md ring-1 ring-[var(--terracota)] focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-black bg-transparent text-sm font-semibold mb-2"
            >
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={state}
              onChange={handleState}
              className="w-full p-2 bg-transparent rounded-md ring-1 ring-[var(--terracota)] focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-black text-sm font-semibold mb-2"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={handleCountry}
              className="w-full p-2 bg-transparent rounded-md ring-1 ring-[var(--terracota)] focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            >
              Create Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeployBranch;
