import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Contract, Provider, constants } from "starknet";
import {
  type ConnectedStarknetWindowObject,
  connect,
  disconnect,
} from "@argent/get-starknet";

import contractAbi from "../../../ABI/supplyChainFactory.json";
import { SupplyChainFactoryAddr } from "@/components/addresses";
import { useAccountContext } from "@/context/connectionContext";
import { useAppContext } from '@/context/provider'


const RegisterBranchAdmins = () => {
  const [connection, setConnection] =
    useState<ConnectedStarknetWindowObject | null>();
  const [adminAddress, setAdminAddress] = useState("");
  const [adminToRemove, setAdminToRemove] = useState("");
  const [oldAdmin, setOldAdmin] = useState("");
  const [newAdmin, setNewAdmin] = useState("");
  const { ShareAccount: account } = useAccountContext();
  const {factoryContractWrite} = useAppContext();


  const setAdmin = async () => {
    try {
      await factoryContractWrite.setDispatchAdmin(adminAddress);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const removeAdmin = async () => {
    try {
      await factoryContractWrite.removeAdmin(adminToRemove);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const assignNewAdmin = async () => {
    try {
      await factoryContractWrite.setDispatchAdmin(adminAddress);
    } catch (error: any) {
      console.log(error.message);
    }
  };


  const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdminAddress(event.target.value);
    console.log("name changed");
    console.log(event.target.value);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle the form submission logic (e.g., send data to server)
    // setSubmittedData(data);
    setAdmin();
    console.log("submitted");
    // console.log(previewImage);
    // console.log(name);
  };
  const remove_admin: SubmitHandler<FormData> = (data) => {
    // Handle the form submission logic (e.g., send data to server)
    // setSubmittedData(data);
    removeAdmin();
    console.log("submitted");
    // console.log(previewImage);
    // console.log(name);
  };

  const assign_new_admin: SubmitHandler<FormData> = (data) => {
    // Handle the form submission logic (e.g., send data to server)
    // setSubmittedData(data);
    assignNewAdmin();
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
      <div className="justify-start p-5 md:p-10 text-left">
        <form className="space-y-4 p-5 md:p-10 rounded" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="mb-5 md:mb-7 text-4xl text-bold font-semibold md:text-2xl">Register Admin</h3>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Admin Address
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
              Register
            </button>
          </div>
        </form>
        <form className="space-y-4 p-5 md:p-10 rounded" onSubmit={handleSubmit(remove_admin)}>
          <div>
            <h3 className="mb-5 md:mb-7 text-4xl text-bold font-semibold md:text-2xl">Remove Admin</h3>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Admin Address
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) => {
                  setAdminToRemove(e.target.value)
                  console.log(adminToRemove)
                }}
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
              Remove Admin
            </button>
          </div>
        </form>
        <form className="space-y-4 p-5 md:p-10 rounded" onSubmit={handleSubmit(assign_new_admin)}>
        <h3 className="mb-5 md:mb-7 text-4xl text-bold font-semibold md:text-2xl">Assign New Admin</h3>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Old Admin
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) => {
                  setOldAdmin(e.target.value);
                  console.log(oldAdmin)
                }}
                autoComplete="name"
                required
                className="block bg-transparent w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-[var(--terracota)] placeholder:text-gray-400  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New Admin
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) => {
                  setNewAdmin(e.target.value);
                  console.log(newAdmin)
                }}
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
              Assign New Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterBranchAdmins;
