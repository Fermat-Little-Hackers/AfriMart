import React, { useState, useEffect } from "react";

const DeployBranch = () => {
  const [companyId, setCompanyId] = useState();
  const [adminId, setAdminId] = useState();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleCompanyId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyId(Number(e.target.value));
  };

  const handleAdminId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminId(Number(e.target.value));
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

  const createBranch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <h3 className="mb-7 text-2xl">Create new branch</h3>
      <div className="justify-start text-left border-2 border-black">
        <form
          onSubmit={createBranch}
          className="p-20 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="companyId"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Company ID
            </label>
            <input
              type="number"
              name="companyId"
              id="companyId"
              value={companyId}
              onChange={handleCompanyId}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="adminId"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Admin ID
            </label>
            <input
              type="number"
              name="adminId"
              id="adminId"
              value={adminId}
              onChange={handleAdminId}
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
              Create Branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeployBranch;
