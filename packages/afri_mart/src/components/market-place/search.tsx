'use client'
import { FaShoppingCart, FaUser, FaBars, FaSearch, FaHome } from 'react-icons/fa';
import Link from "next/link";
import { useState, useEffect, useCallback } from 'react';
import {useRegisteredContext} from '../../context/registeredContext'
import ProfileForm from './createProfile'
import React from 'react';
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import marketPlaceAbi from '@/ABI/marketPlace';
import { MarketPlaceAddr } from '../addresses';
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
//import { useRouter } from 'next/router';
import { useRouter} from 'next/navigation'
import { useLoadingContext } from "@/context/connectionContext";
import { useAppContext } from '@/context/provider'




const startSearch = () => {
  
}



const Search = () => {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const { profileState, setProfileState} = useRegisteredContext();
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const {ShareLoad, setShareLoad} = useLoadingContext();
  const {readContract, readReviewContract,address} = useAppContext();


  const getUserProfile = async( ) => {
      try {
        const details = await readContract.getUserProfile(address);
        // let eth = 1000000000000000000;
        console.log(`user`, details.isCreated);
        setIsCreated(details.isCreated);
      } catch(error: any) {
        console.log(error.message);
      }
  }

  getUserProfile();


  const handleProfileCheck = async() => {
    try {
        const profileSetDetails = await readContract.getUserProfile(address);
        setIsCreated(profileSetDetails.isCreated);
        !profileSetDetails.isCreated ? setProfileState(true) : router.push('/dash');
    } catch (e:any) {
      console.log(e);
      setProfileState(true)
    }



  }

  const handleStateChange = useCallback(() => {
    // logic to handle the state change goes here
    console.log('State changed:', profileState);
    // ROUTE TO THE USER PROFILE PAGE
  }, [profileState]);

  useEffect(() => {
    handleStateChange();
  }, [profileState, handleStateChange]);


    return(
    <div className='shadow-lg items-center py-1'>
        <div className='menuBar sticky flex flex-row md:flex-row mx-5 md:mx-20 my-5 md:justify-between gap-2 md:gap-0'>
          <div className='flex items-center  w-full md:w-[30rem] h-10 ring-1 ring-[var(--sienna)] p-4 pr-0 rounded-lg  shadow-lg outline-none'>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="..."
              className='focus:outline-none w-full md:w-[80%] mr-4 md:mr-6
              lock rounded-md border-0 text-gray-900 font sm:text-sm sm:leading-6 bg-transparent outline-none active:outline-none placeholder:outline-none'
            />
            <button
              type="button"
              className=' bg-[var(--sienna)] text-white px-2 md:px-4 py-2 rounded-lg flex items-center'
              onClick={startSearch}
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
          <div className="flex flex-row gap-2 md:gap-5 md:mt-0 md:pl-0">
            <Link href="/homepage">
              <div className='border-solid bg-[var(--sienna)] shadow-lg border border-gray-100 h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
                <FaHome className="text-white" />
              </div>
            </Link>

            <Link href="/cart">
              <div className='border-solid bg-[var(--sienna)] shadow-lg border border-gray-100 h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
                <FaShoppingCart className="text-white" />
              </div>
            </Link>
            <button
                type="button"
                className='h-[2.7rem] rounded-3xl w-[2.7rem]'
                onClick={handleProfileCheck}
            >
              <div className='border-solid bg-[var(--sienna)] shadow-lg border border-gray-100 h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
                <FaUser className="text-white" />
              </div>
            </button>
            {/* <div className='border-solid border-2 border-black h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
              <FaBars />
            </div> */}
          </div>
        </div>
        {profileState && ( <ProfileForm /> )}
    </div>
    )
}

export default Search;