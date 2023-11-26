import React, { useState } from "react";

const UpdateShipment = () => {
  const [orderId, setOrderId] = useState(0);
  const [nextLocation, setNextLocation] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleOrdeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(Number(e.target.value));
  };

  const handleNextLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextLocation(e.target.value);
  };

  const handleNewStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStatus(e.target.value);
  };

  const updateShipment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4 justify-start text-left">
      <h3>Create new branch</h3>
      <form onSubmit={updateShipment}>
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
          <label htmlFor=""> Next Stop</label>
          <input
            type="text"
            name="nextStop"
            id="nextStop"
            value={nextLocation}
            onChange={handleNextLocation}
          />
        </div>
        <div>
          <label htmlFor="">Current Status</label>
          <input
            type="text"
            name="currentStatus"
            id="currentStatus"
            value={newStatus}
            onChange={handleNewStatus}
          />
        </div>

        <div>
          <button type="submit">Update Shipment</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateShipment;
