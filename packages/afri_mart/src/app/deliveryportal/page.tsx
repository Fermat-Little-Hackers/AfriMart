import React from "react";
import Search from "@/components/market-place/search";
import DeployBranch from "./components/DeployBranch";
import OnboardMarketPlace from "./components/OnboardMarketPlace";
import RegisterBranchAdmins from "./components/RegisterBranchAdmins";
import RegisterDirectors from "./components/RegisterDirectors";
import RegisterSupplychain from "./components/RegisterSupplychain";

const DeliveryPortal = () => {
  const adminFactory = true;
  const companyAdmin = true;
  const branchAdmin = true;
  return (
    <div>
      <Search />
      <div></div>
    </div>
  );
};

export default DeliveryPortal;
