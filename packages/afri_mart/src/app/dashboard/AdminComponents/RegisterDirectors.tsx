import React, { useEffect, useState } from "react";

const RegisterDirectors = () => {
  const [directorAddress, setDirectorAddress] = useState("");

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirectorAddress(e.target.value);
  };

  const onboardDirector: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-4 justify-start text-left">
      <h3>Add Directors</h3>
      <form onSubmit={onboardDirector}>
        <label htmlFor="">Director Address</label>
        <input
          type="text"
          name="contractAddress"
          value={directorAddress}
          onChange={handleAddress}
        />
        <button type="submit">Onboard</button>
      </form>
    </div>
  );
};

export default RegisterDirectors;
