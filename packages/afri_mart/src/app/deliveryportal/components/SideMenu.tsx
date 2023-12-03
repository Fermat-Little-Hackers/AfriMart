"use client";
import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
// import {useSupplyChainContext} from "../../../context/supplyChainContext"
import { useSupplyChainContext } from "../../../context/supplyChainContext";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import {Provider, Contract} from "starknet";
import { SupplyChainFactoryAddr } from "@/components/addresses";
import factory_abi from "../../../ABI/supplyChainFactory.json"
import { useAccountContext } from "@/context/connectionContext";

const SideMenu = () => {
  const { sharedState, setSharedState } = useSupplyChainContext();
  const [textVisible, setTextVisible] = useState(false);
  const [isFactoryAdmin, setIsFactoryAdmin] = useState();
  const [isCompanyAdmin, setIsCompanyAdmin] = useState();
  const [isBranchAdmin, setIsBranchAdmin] = useState();
  const [isStaff, setIsStaff] = useState();
  const {ShareAccount: ShareAddress} = useAccountContext();


  let isActive = { color: "white", backgroundColor: 'rgb(170, 76, 51)', height: '2rem', paddingLeft: '1.5rem'};


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
    console.log(`Share address: ${ShareAddress?.address}`)
    let factory_contract = new Contract(factory_abi, SupplyChainFactoryAddr(), provider);
    let is_factory_admin =  await factory_contract.confirmOwners(ShareAddress?.address);
    let is_company_admin = await factory_contract.confirmCompany(ShareAddress?.address);
    let is_branch_admin = await factory_contract.confirmBranchAdmins(ShareAddress?.address);
    let is_staff = await factory_contract.confirmStaff(ShareAddress?.address);

    setIsFactoryAdmin(is_factory_admin);
    setIsCompanyAdmin(is_company_admin);
    setIsBranchAdmin(is_branch_admin);
    setIsStaff(is_staff);
  }

  useEffect(() => {
    try {
      if (ShareAddress != undefined) {
        setStatus()
        console.log(ShareAddress)
      }
    } catch (err) {
      console.log(err)
    }
  }, [ShareAddress])

  return (
    <div
      className={`${
        textVisible ? "border-2" : "border-0"
      } md:border-2 rounded-lg md:border-r-8 border-[var(--sienna)]`}
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
        } gap-6 flex flex-col pl-5 py-5`}
      >
        {/* <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="Agric" onClick={handleClick} style={{color: isAgric ? 'grey' : 'black'}}>AGRICULTURE</div> */}
        <div
          className= {`hover:cursor-pointer`}
          onClick={handleClick}
          style={sortColor("Home") ? isActive : { color: "black" }}
          // style={{color: 'isAgric' ? 'white' : 'black', backgroundColor: 'isAgric' ? 'rgb(170, 76, 51)' : '', height: '2rem', paddingLeft: 'isAgric' ? '1.5rem': ''}}
          id="Home"
        >
          {" "}
          Home{" "}
        </div>
        <div
          className= {`hover:cursor-pointer hidden ${isBranchAdmin ? 'block' : 'hidden'}`}
          onClick={handleClick}
          style={
            sortColor("deployBranch") ? isActive : { color: "black" }
          }
          id="deployBranch"
        >
          {" "}
          Deploy Branch{" "}
        </div>
        <div
          className= {`hover:cursor-pointer hidden ${isFactoryAdmin ? 'block' : 'hidden'}`}
          onClick={handleClick}
          style={
            sortColor("OnboardMarketPlace")
              ? isActive
              : { color: "black" }
          }
          id="OnboardMarketPlace"
        >
          {" "}
          Onboard Market Place{" "}
        </div>
        <div
          className= {`hover:cursor-pointer hidden ${isCompanyAdmin ? 'block' : 'hidden'}`}
          onClick={handleClick}
          style={
            sortColor("RegisterBranchAdmins")
              ? isActive
              : { color: "black" }
          }
          id="RegisterBranchAdmins"
        >
          {" "}
          Register Branch Admins{" "}
        </div>
        <div
          className= {`hover:cursor-pointer hidden ${isFactoryAdmin ? 'block' : 'hidden'}`}
          onClick={handleClick}
          style={
            sortColor("RegisterDirectors")
              ? isActive
              : { color: "black" }
          }
          id="RegisterDirectors"
        >
          {" "}
          Register Directors{" "}
        </div>
        <div
          className= {`hover:cursor-pointer hidden ${isFactoryAdmin ? 'block' : 'hidden'}`}
          onClick={handleClick}
          style={
            sortColor("RegisterSupplychain")
              ? isActive
              : { color: "black" }
          }
          id="RegisterSupplychain"
        >
          {" "}
          Register Supplychain{" "}
        </div>
        <div
          className= {`hover:cursor-pointer}`}
          onClick={handleClick}
          style={
            sortColor("TrackSipment") ? isActive : { color: "black" }
          }
          id="TrackSipment"
        >
          {" "}
          Track Shipment{" "}
        </div>
        <div
          className= {`hover:cursor-pointer hidden ${isStaff ? 'block' : 'hidden'}`}
          onClick={handleClick}
          style={
            sortColor("RegisterNewShipment")
              ? isActive
              : { color: "black" }
          }
          id="RegisterNewShipment"
        >
          {" "}
          Register New Shipment{" "}
        </div>
        <div
          className= {`hover:cursor-pointer hidden ${isStaff ? 'block' : 'hidden'}`}
          onClick={handleClick}
          style={
            sortColor("UpdateShipmentLocation")
              ? isActive
              : { color: "black" }
          }
          id="UpdateShipmentLocation"
        >
          {" "}
          Update Shipment Location{" "}
        </div>
        <div
          className= {`hover:cursor-pointer hidden ${isFactoryAdmin || isCompanyAdmin || isBranchAdmin || isStaff ? 'block' : 'hidden'}`}
          onClick={handleClick}
          style={
            sortColor("TrackAllItem") ? isActive : { color: "black" }
          }
          id="TrackAllItem"
        >
          {" "}
          Pending Deliveries{" "}
        </div>
        <div
          className= {`hover:cursor-pointer hidden ${isBranchAdmin ? 'block' : 'hidden'}`}
          onClick={handleClick}
          style={
            sortColor("WhitelisAccount") ? isActive: { color: "black" }
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
