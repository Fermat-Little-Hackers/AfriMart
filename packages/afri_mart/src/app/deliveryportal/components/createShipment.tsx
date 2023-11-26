import React, { useState } from "react";

const CreateShipment = () => {
  const [orderId, setOrderId] = useState(0);
  const [name, setName] = useState("");
  const [pictureCid, setPictureCid] = useState("");
  const [address, setAddress] = useState("");
  const [trackingMode, setTrackingMode] = useState("");

  const handleOrdeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(Number(e.target.value));
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePictureCid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPictureCid(e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleTrackingMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingMode(e.target.value);
  };

  const createShipment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4 justify-start text-left">
      <h3>Create new branch</h3>
      <form onSubmit={createShipment}>
        <div>
          <label htmlFor="">Order ID</label>
          <input
            type="number"
            name="orderId"
            id="orderId"
            value={orderId}
            onChange={handleOrdeId}
          />
        </div>
        <div>
          <label htmlFor=""> Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
          />
        </div>
        <div>
          <label htmlFor="">Upload Picture</label>
          <input
            type="file"
            name="cid"
            id="cid"
            value={pictureCid}
            onChange={handlePictureCid}
          />
        </div>
        <div>
          <label htmlFor="">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={handleAddress}
          />
        </div>
        <div>
          <label htmlFor="">Tracking Mode</label>
          <input
            type="text"
            name="trackMode"
            id="countrackModetry"
            value={trackingMode}
            onChange={handleTrackingMode}
          />
        </div>
        <div>
          <button type="submit">Create Shipment</button>
        </div>
      </form>
    </div>
  );
};

export default CreateShipment;
