import React, { useEffect, useState } from "react";

const OnboardMarketPlace = () => {
  const [marketPlaceAddress, setMarketAddress] = useState("");

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketAddress(e.target.value);
  };

  const onboardMarketPlace: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4 justify-start text-left">
      <h3>Onboard Market Place</h3>
      <form onSubmit={onboardMarketPlace}>
        <label htmlFor="">Market place Address</label>
        <input
          type="text"
          name="contractAddress"
          value={marketPlaceAddress}
          onChange={handleAddress}
        />
        <button type="submit">Onboard</button>
      </form>
    </div>
  );
};

export default OnboardMarketPlace;
