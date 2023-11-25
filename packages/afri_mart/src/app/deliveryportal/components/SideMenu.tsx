'use client'
import React, { HTMLInputTypeAttribute } from "react";
import {useSupplyChainContext} from "../../../context/supplyChainContext"



const SideMenu  = () => {
    const { sharedState, setSharedState } = useSupplyChainContext();
    const handleClick = (e) => {
        console.log(e);
        setSharedState(e.target.id);
        console.log(e.target.id);
    }

    const sortColor = (active) => {
        if (active == sharedState) {
                return true;
        } else {
            return false;
        }
    }

    return (
    <div className="border-2 border-black w-[20vw]">
       <div className="gap-4 flex flex-col p-5">
        {/* <div className="my-[41px] mx-auto w-[150px] hover:cursor-pointer" id="Agric" onClick={handleClick} style={{color: isAgric ? 'grey' : 'black'}}>AGRICULTURE</div> */}
            <div className="hover:cursor-pointer" onClick={handleClick} style={sortColor('Home') ? {color: "gray"} : {color: 'black'}} id="Home"> Home </div>
            <div className="hover:cursor-pointer" onClick={handleClick} style={sortColor('deployBranch') ? {color: "gray"} : {color: 'black'}} id="deployBranch"> Deploy Branch </div>
            <div className="hover:cursor-pointer" onClick={handleClick} style={sortColor('OnboardMarketPlace') ? {color: "gray"} : {color: 'black'}} id="OnboardMarketPlace"> Onboard Market Place </div>
            <div className="hover:cursor-pointer" onClick={handleClick} style={sortColor('RegisterBranchAdmins') ? {color: "gray"} : {color: 'black'}} id="RegisterBranchAdmins"> Register Branch Admins </div>
            <div className="hover:cursor-pointer" onClick={handleClick} style={sortColor('RegisterDirectors') ? {color: "gray"} : {color: 'black'}} id="RegisterDirectors"> Register Directors </div>
            <div className="hover:cursor-pointer" onClick={handleClick} style={sortColor('RegisterSupplychain') ? {color: "gray"} : {color: 'black'}} id="RegisterSupplychain"> Register Supplychain </div>
            <div className="hover:cursor-pointer" onClick={handleClick} style={sortColor('TrackSipment') ? {color: "gray"} : {color: 'black'}} id="TrackSipment"> Track Shipment </div>
            <div className="hover:cursor-pointer" onClick={handleClick} style={sortColor('RegisterNewShipment') ? {color: "gray"} : {color: 'black'}} id="RegisterNewShipment"> Register New Shipment </div>
            <div className="hover:cursor-pointer" onClick={handleClick} style={sortColor('UpdateShipmentLocation') ? {color: "gray"} : {color: 'black'}} id="UpdateShipmentLocation"> Update Shipment Location </div>
       </div>
    </div>
  )
}

export default SideMenu
