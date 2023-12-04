"use client";
import React, { useState, useEffect } from "react";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants, ProviderInterface } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";
import UserWithPhotos from "./userWithPhotos";
import { useConnectionContext } from "@/context/connectionContext";
import { useLoadingContext } from "@/context/connectionContext";
import { useAppContext } from '@/context/provider'



const UserDetails = () => {
  const [profileOwner, setProfileOwner] = useState("");
  const [ipfsString, setIpfsString] = useState('');
  const {ShareLoad, setShareLoad} = useLoadingContext();
  const {readContract,address} = useAppContext();

console.log(address);


  const getUser = async() => {
      try {
      const user = await readContract.getUserProfile('0x01a7875bf5627Ce1ee8bA0BC29B4B1e0207121aFFF415D043D1538881FE69910');
      // console.log('0x' + (user.name.toString(16)).toString())
        const res = hexToReadableText(user.name.toString(16))
        setProfileOwner(res)
        const hash1 = hexToReadableText(user.profileImg1.toString(16))
        const hash2 = hexToReadableText(user.profileImg2.toString(16))
        console.log(hash1)
        setIpfsString(`${hash1 + hash2}`)
      } catch (error : any) {
  
        console.log(error.message)
      }
  }
  useEffect(() => {
    getUser()
  }, [address])

  useEffect(() => {
    setShareLoad(false)
  }, [ipfsString])
  

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
                    address ? `${address.slice(0, 8)}.....${address.slice(-8)}` : ''
                }</div>
      </div>
    </div>
  );
};

export default UserDetails;
