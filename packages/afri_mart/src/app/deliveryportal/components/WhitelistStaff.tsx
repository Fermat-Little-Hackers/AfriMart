import React, { useEffect, useState } from "react";
import {
  type ConnectedStarknetWindowObject,
  connect,
  disconnect,
} from "@argent/get-starknet";

import contractAbi from "../../../ABI/supplyChainContract.json";
import factory_abi from "../../../ABI/supplyChainFactory.json";
import { SupplyChainContractAddr, SupplyChainFactoryAddr } from "@/components/addresses";
import { Contract, Provider } from "starknet";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAccountContext } from "@/context/connectionContext";

const WhitelistStaff = () => {
  const [connection, setConnection] =
    useState<ConnectedStarknetWindowObject | null>();
  const [staffAddress, setStaffAddress] = useState("");
  const {ShareAccount, ShareAddress} = useAccountContext();

  const setStaff = async () => {
    try {

        const provider = new Provider({
        rpc: {
            nodeUrl:
            "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx",
        },
        });

        let factory_contract = new Contract(factory_abi, SupplyChainFactoryAddr(), provider);
        let address_to_call = factory_contract.getStaffBranch(ShareAddress);


      const contract = new Contract(
        contractAbi,
        address_to_call,
        ShareAccount
      );
      await contract.whitelist_account(staffAddress);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStaffAddress(event.target.value);
    console.log("name changed");
    console.log(event.target.value);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle the form submission logic (e.g., send data to server)
    // setSubmittedData(data);
    setStaff();
    console.log("submitted");
    // console.log(previewImage);
    // console.log(name);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <div className="">
      <h3 className="mb-5 md:mb-7 text-4xl text-bold font-semibold md:text-2xl mx-20 my-10">Whitelist Account</h3>
      <div className="justify-start p-5 md:p-10 text-left">
        <form className="space-y-4 p-5 md:p-20 rounded" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Account to Whitelist
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleAddress}
                autoComplete="name"
                required
                className="block bg-transparent w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-[var(--terracota)] placeholder:text-gray-400  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex flex-row gap-5 items-center justify-center">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Whitelist Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhitelistStaff;
