"use client";
import React, { HTMLInputTypeAttribute, useState } from "react";
// import {useSupplyChainContext} from "../../../context/supplyChainContext"
import { useSupplyChainContext } from "../../../context/supplyChainContext";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";

const SideMenu = () => {
  const { sharedState, setSharedState } = useSupplyChainContext();
  const [textVisible, setTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setTextVisible(!textVisible);
  };

  const handleClick = (e: any) => {
    toggleTextVisibility();
    setSharedState(e.target.id);
    toggleTextVisibility();
    console.log(e.target.id);
  };

  const sortColor = (active: string) => {
    if (active == sharedState) {
      return true;
    } else {
      return false;
    }
  };

  const sortIcon = () => {};

  return (
    <div
      className={`${
        textVisible ? "border-2 border-red-100" : "border-0"
      } md:border-2 md:border-red-100`}
    >
      <div
        className={`border-solid border-2 border-black h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center md:hidden cursor-pointer`}
        onClick={toggleTextVisibility}
      >
        {textVisible ? <FaTimes /> : <FaBars />}
      </div>
      <div
        className={`${
          textVisible ? "block md:flex" : "hidden md:flex"
        } gap-6 flex flex-col p-5`}
      >
        {/* <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="Agric" onClick={handleClick} style={{color: isAgric ? 'grey' : 'black'}}>AGRICULTURE</div> */}
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={sortColor("Home") ? { color: "gray" } : { color: "black" }}
          id="Home"
        >
          {" "}
          Home{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("deployBranch") ? { color: "gray" } : { color: "black" }
          }
          id="deployBranch"
        >
          {" "}
          Deploy Branch{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("OnboardMarketPlace")
              ? { color: "gray" }
              : { color: "black" }
          }
          id="OnboardMarketPlace"
        >
          {" "}
          Onboard Market Place{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("RegisterBranchAdmins")
              ? { color: "gray" }
              : { color: "black" }
          }
          id="RegisterBranchAdmins"
        >
          {" "}
          Register Branch Admins{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("RegisterDirectors")
              ? { color: "gray" }
              : { color: "black" }
          }
          id="RegisterDirectors"
        >
          {" "}
          Register Directors{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("RegisterSupplychain")
              ? { color: "gray" }
              : { color: "black" }
          }
          id="RegisterSupplychain"
        >
          {" "}
          Register Supplychain{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("TrackSipment") ? { color: "gray" } : { color: "black" }
          }
          id="TrackSipment"
        >
          {" "}
          Track Shipment{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("RegisterNewShipment")
              ? { color: "gray" }
              : { color: "black" }
          }
          id="RegisterNewShipment"
        >
          {" "}
          Register New Shipment{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("UpdateShipmentLocation")
              ? { color: "gray" }
              : { color: "black" }
          }
          id="UpdateShipmentLocation"
        >
          {" "}
          Update Shipment Location{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("TrackAllItem") ? { color: "gray" } : { color: "black" }
          }
          id="TrackAllItem"
        >
          {" "}
          Pending Deliveries{" "}
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={handleClick}
          style={
            sortColor("WhitelisAccount") ? { color: "gray" } : { color: "black" }
          }
          id="WhitelistAccount"
        >
          {" "}
          Whitelist Account{" "}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
