import React, { useEffect, useState } from "react";

const RegisterBranchAdmins = () => {
  const [companyId, setCompanyId] = useState(0);
  const [adminAddress, setAdminAddress] = useState("");

  const handleCompanyId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyId(Number(e.target.value));
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminAddress(e.target.value);
  };

  const registerAdmin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-4 justify-start text-left">
      <h3>Register your branch admins</h3>
      <form onSubmit={registerAdmin}>
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
          <label htmlFor="">Admin Address</label>
          <input
            type="text"
            name="contractAddress"
            id="contractAddress"
            value={adminAddress}
            onChange={handleAddress}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterBranchAdmins;
