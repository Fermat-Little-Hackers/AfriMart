import React, { useState, useEffect } from "react";

const UpdateShipment = () => {
  const [OrderId, setOrderId] = useState<any>();
  const [NextStop, setNextStop] = useState<any>();
  const [CurrentStatus, setCurrentStatus] = useState("");

  const handleOrderId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const handleNextStop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextStop(e.target.value);
  };

  const handleCurrentStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentStatus(e.target.value);
  };


  const updateShipment: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <h3 className="mb-5 md:mb-7 text-xl md:text-2xl">Update Shipment</h3>
      <div className="justify-start text-left  ">
        <form
          onSubmit={updateShipment}
          className="  rounded  "
        >
          <div className="mb-4">
            <label
              htmlFor="OrderId"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Order ID
            </label>
            <input
              type="number"
              name="OrderId"
              id="OrderId"
              value={OrderId}
              onChange={handleOrderId}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="NextStop"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Next Stop
            </label>
            <input
              type="String"
              name="NextStop"
              id="NextStop"
              value={NextStop}
              onChange={handleNextStop}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="CurrentStatus"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Current Status
            </label>
            <input
              type="text"
              name="CurrentStatus"
              id="CurrentStatus"
              value={CurrentStatus}
              onChange={handleCurrentStatus}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            >
              Update Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateShipment;
