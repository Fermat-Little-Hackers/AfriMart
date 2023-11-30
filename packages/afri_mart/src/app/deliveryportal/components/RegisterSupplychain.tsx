import React, { HTMLInputTypeAttribute } from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Contract, Provider, constants, num } from "starknet";
import {
  type ConnectedStarknetWindowObject,
  connect,
  disconnect,
} from "@argent/get-starknet";

import contractAbi from "../../../ABI/supplyChainFactory.json";
import { SupplyChainFactoryAddr } from "@/components/addresses";

const RegisterSupplychain = () => {
  const [connection, setConnection] =
    useState<ConnectedStarknetWindowObject | null>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState("");
  const [companyRepAddr, setCompanyRepAddr] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const connectToStarknet = async () => {
      const connection = await connect({
        modalMode: "neverAsk",
        webWalletUrl: "https://web.argent.xyz",
      });

      if (connection && connection.isConnected) {
        setConnection(connection);
        setAccount(connection.account);
        setAddress(connection.selectedAddress);
      }

      if (connection?.chainId !== "SN_GOERLI") {
        alert("you need to switch to GOERLI to proceed!");
        try {
          await window?.starknet?.request({
            type: "wallet_switchStarknetChain",
            params: {
              chainId: "SN_GOERLI",
            },
          });
        } catch (error: any) {
          alert(error.message);
        }
      }
    };
    connectToStarknet();
  }, []);

  const setSupplyChain = async () => {
    try {
      const contract = new Contract(
        contractAbi,
        SupplyChainFactoryAddr(),
        account
      );
      await contract.setDispatchHqAdmin(
        companyRepAddr,
        companyName,
        country,
        state,
        city
      );
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyRepAddr(e.target.value);
  };

  const handleCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle the form submission logic (e.g., send data to server)
    // setSubmittedData(data);
    setSupplyChain();
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
      <h3 className="mb-7 text-xl md:text-2xl">Register Supply Chain</h3>
      <div className="justify-start text-left border-2 border-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 md:p-20 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="companyId"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Rep Address
            </label>
            <input
              type="text"
              name="contract Address"
              id="repAddress"
              value={companyRepAddr}
              onChange={handleAddress}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="adminId"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              name="company"
              id="companyName"
              value={companyName}
              onChange={handleCompanyName}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={handleCity}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={state}
              onChange={handleState}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={handleCountry}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterSupplychain;
