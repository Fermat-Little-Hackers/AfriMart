import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import contractAbi from "../../../ABI/supplyChainContract.json";
import {connect} from "@argent/get-starknet";
import { ConnectedStarknetWindowObject } from "get-starknet-core";
import { Contract } from "starknet";
import { SupplyChainContractAddr } from "@/components/addresses";

interface FormData {
  profilePicture: FileList | null;
  // name: string;
  // state: string;
  // country: string;
}

const ResgisterShipment = () => {
  const [OrderId, setOrderId] = useState<any>();
  const [Name, setName] = useState<any>();
  const [shipmentAddress, setShipmentAddress] = useState("");
  const [trackMode, settrackMode] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState('');


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  // const getStaffBranch = async () => {
  //   const provider = new Provider({
  //     rpc: {
  //       nodeUrl:
  //         "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx",
  //     },
  //   });

  //   try {
  //     const contract = new Contract(contractAbi, SupplyChainFactoryAddr(), provider)
  //     const branch = await contract.
  //   }
  //   catch(error){

  //   }
  // };

  const handleOrderId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipmentAddress(e.target.value);
  };

  const handletrackMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    settrackMode(e.target.value);
  };


  useEffect(() => {
    const connectToStarknet = async () => {
      const connection = await connect({
        modalMode: "neverAsk",
        webWalletUrl: "https://web.argent.xyz",
      });

      if (connection && connection.isConnected) {
        setConnection(connection);
        setAccount(connection.account);
        setAddress(connection.selectedAddress);
      }

      if (connection?.chainId !== "SN_GOERLI") {
        alert("you need to switch to GOERLI to proceed!");
        try {
          await window?.starknet?.request({
            type: "wallet_switchStarknetChain",
            params: {
              chainId: "SN_GOERLI",
            },
          });
        } catch (error: any) {
          alert(error.message);
        }
      }
    };
    connectToStarknet();
  }, []);


  const registerShipment: SubmitHandler<FormData> = async () => {
    console.log("Registering Shipment......");
    try {
      const contract = new Contract(
        contractAbi,
        SupplyChainContractAddr(),
        account
      );
      await contract.create_shipment(OrderId, Name, previewImage, shipmentAddress, trackMode);
    } catch (error: any) {
      console.log(error.message);
    }
  };




  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Set the preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Update form value for validation
      setValue("profilePicture", event.target.files);
    }
  };

  return (
    <div className="">
      <h3 className="mb-5 md:mb-7 text-xl md:text-2xl">Register Shipment</h3>
      <div className="justify-start text-left ">
        <form
          onSubmit={handleSubmit(registerShipment)}
          className="p-5 md:p-20 bg-white rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="OrderId"
              className="block  text-gray-600 text-sm font-semibold mb-2"
            >
              Order ID
            </label>
            <input
              type="number"
              name="OrderId"
              id="OrderId"
              value={OrderId}
              onChange={handleOrderId}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Name"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              NAME
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              value={Name}
              onChange={handleName}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <div>
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={2}
                  height={2}
                  className="mt-2 w-16 h-16 object-cover md:mr-5 rounded-full border border-gray-300"
                />
              )}
            </div>
            <div className="flex items-center justify-center">
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                onChange={handleImageChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="Address"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              name="Address"
              id="Address"
              value={shipmentAddress}
              onChange={handleAddress}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="trackMode"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Tracking Code
            </label>
            <input
              type="text"
              name="trackMode"
              id="trackMode"
              value={trackMode}
              onChange={handletrackMode}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            >
              Register Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResgisterShipment;
