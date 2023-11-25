import React, { useEffect, useState } from "react";

const Userprofile = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
  };

  const createProfile: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h3>Create Profile</h3>
      <form onSubmit={createProfile}>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            placeholder="Kenny Genesis"
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
            placeholder="Nigeria"
          />
        </div>

        <div>
          <label htmlFor="">Region</label>
          <input
            type="text"
            name="region"
            id="region"
            value={region}
            onChange={handleRegion}
            placeholder=""
          />
        </div>

        <div>
          <button type="submit">Create Profile</button>
        </div>
      </form>
    </div>
  );
};

export default Userprofile;
