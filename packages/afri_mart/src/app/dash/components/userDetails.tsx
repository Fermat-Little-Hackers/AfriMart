"use client";
import React, { useState, useEffect } from "react";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants, ProviderInterface } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";


const UserDetails = () => {
  const [profileOwner, setProfileOwner] = useState("");
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState('');

  const getUser = async() => {
    const provider = new Provider({
      // sequencer: {
      //   network: "goerli-alpha",
      // },
      rpc: {
        nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx"

      }
    })
      try {
      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider)
      const user = await contract.getUserProfile(address.toString());
      // console.log('0x' + (user.name.toString(16)).toString())
        const res = hexToReadableText(user.name.toString(16))
        // console.log(res)
      } catch (error : any) {
  
        console.log(error.message)
      }
  }
  getUser()

  function hexToReadableText(hexString : any) {
    const bytes = Buffer.from(hexString, 'hex'); 
    const text = new TextDecoder('utf-8').decode(bytes);
    return text;
  }

  useEffect(() => {
    const connectToStarknet = async() => {
      const connection = await connect({ modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" })
      if(connection && connection.isConnected) {
        setConnection(connection)
        setAccount(connection.account)
        setAddress(connection.selectedAddress)
      }
    }
    connectToStarknet()
  }, [])  
  return (
    <div className="flex mt-20 smx:mt-10 border-2 border-black w-[300px] smx:w-[100%] smx:mx-auto p-4">
      <div className="rounded-full w-20  h-20 border-solid border-2 border-black mr-4"></div>
      <div className=" float-right">
        <div>Kehinde Paul</div>
        <div>0x684864bhfg747449jtk</div>
      </div>
    </div>
  );
};

export default UserDetails;
