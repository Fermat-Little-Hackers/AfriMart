"use client";
import React, { useState, useEffect } from "react";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants, ProviderInterface } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";
import UserWithPhotos from "./userWithPhotos";
import { useConnectionContext } from "@/context/connectionContext";


const UserDetails = () => {
  const [profileOwner, setProfileOwner] = useState("");
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState<string | undefined>('');
  const [ipfsString, setIpfsString] = useState('');
  const {ShareAddress, setShareAddress} = useConnectionContext()


  const getUser = async() => {
    const provider = new Provider({
      rpc: {
        nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx"

      }
    })
      try {
      const connection = await connect({ modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" })
      setAddress(connection?.selectedAddress)
      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider)
      const user = await contract.getUserProfile(ShareAddress?.toString());
      // console.log('0x' + (user.name.toString(16)).toString())
        const res = hexToReadableText(user.name.toString(16))
        setProfileOwner(res)
        const hash1 = hexToReadableText(user.profileImg1.toString(16))
        const hash2 = hexToReadableText(user.profileImg2.toString(16))
        setIpfsString(`${hash1 + hash2}`)
      } catch (error : any) {
  
        console.log(error.message)
      }
  }
  useEffect(() => {
    getUser()
  }, [ShareAddress])
  

  function hexToReadableText(hexString : any) {
    const bytes = Buffer.from(hexString, 'hex'); 
    const text = new TextDecoder('utf-8').decode(bytes);
    return text;
  }

  return (
    <div className="flex shadow-lg rounded-lg ring-1 ring-red-100  w-[400px] smx:w-[100%] smx:mx-auto p-4 gap-4">
      <UserWithPhotos uri={ipfsString} />
      <div className=" float-right">
        <div className="font-bold text-lg">{profileOwner}</div>
        <div> {
                    ShareAddress ? `${ShareAddress.slice(0, 8)}.....${ShareAddress.slice(-8)}` : ''
                }</div>
      </div>
    </div>
  );
};

export default UserDetails;
