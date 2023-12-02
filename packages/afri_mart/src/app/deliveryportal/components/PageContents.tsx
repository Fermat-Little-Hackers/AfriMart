"use client";
import React, { HTMLInputTypeAttribute } from "react";
import { useSupplyChainContext } from "../../../context/supplyChainContext";
import DeployBranch from "./DeployBranch";
import OnboardMarketPlace from "./OnboardMarketPlace";
import RegisterBranchAdmins from "./RegisterBranchAdmins";
import RegisterDirectors from "./RegisterDirectors";
import RegisterSupplychain from "./RegisterSupplychain";
import Home from "./Home";
import RegisterShipment from "./RegisterShipment";
import TrackShipment from "./TrackShipment";
import UpdateShipment from "./UpdateShipment";
import TrackAllItem from "./TrackAllItem";
import WhitelistStaff from "./WhitelistStaff";

const PageContents = () => {
  const { sharedState, setSharedState } = useSupplyChainContext();

  const renderContents = () => {
    if (sharedState == "deployBranch") {
      return <DeployBranch />;
    } else if (sharedState == "OnboardMarketPlace") {
      return <OnboardMarketPlace />;
    } else if (sharedState == "Home") {
      return <Home />;
    } else if (sharedState == "RegisterBranchAdmins") {
      return <RegisterBranchAdmins />;
    } else if (sharedState == "RegisterDirectors") {
      return <RegisterDirectors />;
    } else if (sharedState == "RegisterSupplychain") {
      return <RegisterSupplychain />;
    } else if (sharedState == "RegisterNewShipment") {
      return <RegisterShipment />;
    } else if (sharedState == "TrackSipment") {
      return <TrackShipment />;
    } else if (sharedState == "UpdateShipmentLocation") {
      return <UpdateShipment />;
    } else if (sharedState == "TrackAllItem") {
      return <TrackAllItem />;
    } else if (sharedState == "WhitelistAccount") {
      return <WhitelistStaff/>;
    } else {
      return <Home />;
    }
  };

  return (
    <div className="w-full">
      {renderContents()}
    </div>
  );
};

export default PageContents;
