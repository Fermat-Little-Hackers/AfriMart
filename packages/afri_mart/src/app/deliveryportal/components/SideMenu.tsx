"use client";
import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
// import {useSupplyChainContext} from "../../../context/supplyChainContext"
import { useSupplyChainContext } from "../../../context/supplyChainContext";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Provider, Contract } from "starknet";
import { SupplyChainFactoryAddr } from "@/components/addresses";
import factory_abi from "../../../ABI/supplyChainFactory.json";
import {
  useAccountContext,
  useConnectionContext,
} from "@/context/connectionContext";

const SideMenu = () => {
  const [account, setAccount] = useState();
  const [staffAddress, setStaffAddress] = useState("");
  const { sharedState, setSharedState } = useSupplyChainContext();
  const [textVisible, setTextVisible] = useState(false);
  const [isFactoryAdmin, setIsFactoryAdmin] = useState();
  const [isCompanyAdmin, setIsCompanyAdmin] = useState();
  const [isBranchAdmin, setIsBranchAdmin] = useState();
  const [isStaff, setIsStaff] = useState();
  const { ShareAddress } = useConnectionContext();

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

  const setStatus = async () => {
    const provider = new Provider({
      rpc: {
        nodeUrl:
          "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx",
      },
    });

    let factory_contract = new Contract(
      factory_abi,
      SupplyChainFactoryAddr(),
      provider
    );
    console.log("haa", ShareAddress.toString());

    let is_factory_admin = await factory_contract?.confirmOwners(ShareAddress);
    let is_company_admin = await factory_contract?.confirmCompany(
      ShareAddress?.toString()
    );
    let is_branch_admin = await factory_contract?.confirmBranchAdmins(
      ShareAddress?.toString()
    );
    let is_staff = await factory_contract?.confirmStaff(
      ShareAddress?.toString()
    );

    setIsFactoryAdmin(is_factory_admin);
    setIsCompanyAdmin(is_company_admin);
    setIsBranchAdmin(is_branch_admin);
    // setIsStaff(is_staff);
  };

  useEffect(() => {
    setAccount(ShareAddress);
  }, []);

  useEffect(() => {
    try {
      setStatus();
    } catch (err) {
      console.log(err);
    }
  }, []);

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
          className={`hover:cursor-pointer`}
          onClick={handleClick}
          style={sortColor("Home") ? { color: "gray" } : { color: "black" }}
          id="Home"
        >
          {" "}
          Home{" "}
        </div>
        <div
          className={`hover:cursor-pointer hidden ${
            isBranchAdmin ? "block" : "hidden"
          }`}
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
          className={`hover:cursor-pointer hidden ${
            isFactoryAdmin ? "block" : "hidden"
          }`}
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
          className={`hover:cursor-pointer hidden ${
            isCompanyAdmin ? "block" : "hidden"
          }`}
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
          className={`hover:cursor-pointer hidden ${
            isFactoryAdmin ? "block" : "hidden"
          }`}
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
          className={`hover:cursor-pointer hidden ${
            isFactoryAdmin ? "block" : "hidden"
          }`}
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
          className={`hover:cursor-pointer}`}
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
          className={`hover:cursor-pointer hidden ${
            isStaff ? "block" : "hidden"
          }`}
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
          className={`hover:cursor-pointer hidden ${
            isStaff ? "block" : "hidden"
          }`}
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
          className={`hover:cursor-pointer hidden ${
            isFactoryAdmin || isCompanyAdmin || isBranchAdmin || isStaff
              ? "block"
              : "hidden"
          }`}
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
          className={`hover:cursor-pointer hidden ${
            isBranchAdmin ? "block" : "hidden"
          }`}
          onClick={handleClick}
          style={
            sortColor("WhitelisAccount")
              ? { color: "gray" }
              : { color: "black" }
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
