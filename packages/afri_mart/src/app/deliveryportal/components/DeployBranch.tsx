import React, { useState, useEffect } from "react";

const DeployBranch = () => {
  const [companyId, setCompanyId] = useState(0);
  const [adminId, setAdminId] = useState(0);
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
    <div className="p-4 justify-start text-left">
      <h3>Create new branch</h3>
      <form onSubmit={createBranch}>
        <div>
          <label htmlFor="">Company ID</label>
          <input
            type="number"
            name="companyId"
            id="companyId"
            value={companyId}
            onChange={handleCompanyId}
          />
        </div>
        <div>
          <label htmlFor="">Admin ID</label>
          <input
            type="number"
            name="adminId"
            id="adminId"
            value={adminId}
            onChange={handleAdminId}
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
          <button type="submit">Create Branch</button>
        </div>
      </form>
    </div>
  );
};

export default DeployBranch;
