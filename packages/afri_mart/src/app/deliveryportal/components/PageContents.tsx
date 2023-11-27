'use client'
import React, { HTMLInputTypeAttribute } from "react";
import {useSupplyChainContext} from "../../../context/supplyChainContext"
import DeployBranch from "./DeployBranch";
import OnboardMarketPlace from "./OnboardMarketPlace";
import RegisterBranchAdmins from "./RegisterBranchAdmins";
import RegisterDirectors from "./RegisterDirectors";
import RegisterSupplychain from "./RegisterSupplychain";
import Home from "./Home";
import RegisterShipment from "./RegisterShipment";
import TrackShipment from "./TrackShipment";
import UpdateShipment from "./UpdateShipment";





const PageContents  = () => {
    const { sharedState, setSharedState } = useSupplyChainContext();

    const renderContents = () => {
        if (sharedState == 'deployBranch') {
            return (<DeployBranch />)
        } else if (sharedState == 'OnboardMarketPlace'){
            return (<OnboardMarketPlace />)
        } else if (sharedState == 'Home') {
            return (<Home/>)
        } else if (sharedState == 'RegisterBranchAdmins') {
            return (<RegisterBranchAdmins />)
        } else if (sharedState == 'RegisterDirectors') {
            return (<RegisterDirectors />)
        } else if (sharedState == 'RegisterSupplychain') {
            return (<RegisterSupplychain />)
        } else if (sharedState == 'RegisterNewShipment') {
            return (<RegisterShipment/>)
        } else if (sharedState == 'TrackSipment') {
            return (<TrackShipment/>)
        } else if (sharedState == 'UpdateShipmentLocation') {
            return (<UpdateShipment />)
        } else {
            return (<Home/>)
        }

        
    }

    return (
    <div className="border-2 border-black h-fit px-5 md:px-20 py-7 md:py-16">
       { renderContents()}
    </div>
  )
}

export default PageContents