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
    <div className="p-4 justify-start text-left">
      <h3>Register Supplychain</h3>
      <form onSubmit={registerSupplychain}>
        <div>
          <label htmlFor="">Rep Address</label>
          <input
            type="text"
            name="contract Address"
            id="repAddress"
            value={companyRepAddr}
            onChange={handleAddress}
          />
        </div>
        <div>
          <label htmlFor="">Company Name</label>
          <input
            type="text"
            name="company"
            id="companyName"
            value={companyName}
            onChange={handleCompanyName}
          />
        </div>
        <div>
          <label htmlFor="">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={handleCountry}
          />
        </div>
        <div>
          <label htmlFor="">State</label>
          <input
            type="text"
            name="state"
            id="state"
            value={state}
            onChange={handleState}
          />
        </div>
        <div>
          <label htmlFor="">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={handleCity}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterSupplychain;
