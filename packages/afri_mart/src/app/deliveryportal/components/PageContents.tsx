'use client'
import React, { HTMLInputTypeAttribute } from "react";
import {useSupplyChainContext} from "../../../context/supplyChainContext"
import DeployBranch from "./DeployBranch";
import OnboardMarketPlace from "./OnboardMarketPlace";
import RegisterBranchAdmins from "./RegisterBranchAdmins";
import RegisterDirectors from "./RegisterDirectors";
import RegisterSupplychain from "./RegisterSupplychain";





const PageContents  = () => {
    const { sharedState, setSharedState } = useSupplyChainContext();

    const renderContents = () => {
        if (sharedState == 'deployBranch') {
            return (<DeployBranch />)
        } else if (sharedState == 'OnboardMarketPlace'){
            return (<OnboardMarketPlace />)
        } else if (sharedState == 'Home') {
            return (<p>HOME</p>)
        } else if (sharedState == 'RegisterBranchAdmins') {
            return (<RegisterBranchAdmins />)
        } else if (sharedState == 'RegisterDirectors') {
            return (<RegisterDirectors />)
        } else if (sharedState == 'RegisterSupplychain') {
            return (<RegisterSupplychain />)
        } else if (sharedState == 'RegisterNewShipment') {
            return (<p>REGISTER NEW SHIPMENT</p>)
        } else if (sharedState == 'TrackSipment') {
            return (<p>TRACK SHIPMENT</p>)
        } else if (sharedState == 'UpdateShipmentLocation') {
            return (<p>UPDATE SHIPMENT</p>)
        } else {
            return (<p>OMOHH NOTHING YET</p>)
        }

        
    }

    return (
    <div className="border-2 border-black h-[100vh]">
       { renderContents()}
    </div>
  )
}

export default PageContents
