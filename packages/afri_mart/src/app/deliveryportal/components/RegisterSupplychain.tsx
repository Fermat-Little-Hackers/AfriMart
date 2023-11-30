import React, { HTMLInputTypeAttribute } from "react";
import { num, Contract } from "starknet";
import { useState, useEffect } from "react";

const RegisterSupplychain = () => {
  const [companyRepAddr, setCompanyRepAddr] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

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

  const registerSupplychain: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <h3 className="mb-7 text-xl md:text-2xl">Register Supply Chain</h3>
      <div className="justify-start text-left ">
        <form
          onSubmit={registerSupplychain}
          className="w-3/4 rounded "
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
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
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
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
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
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
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
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
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
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
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
