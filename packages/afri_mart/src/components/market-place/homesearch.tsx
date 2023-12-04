'use client';
import { FaShoppingCart, FaUser, FaBars, FaSearch, FaHome } from 'react-icons/fa';
import Link from "next/link";
import ProfileForm from './createProfile';
import { useRouter} from 'next/navigation'
import { useState, useEffect, useCallback } from 'react';
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import {useRegisteredContext} from '../../context/registeredContext'
import marketPlaceAbi from '@/ABI/marketPlace';
import { MarketPlaceAddr } from '../addresses';
import { useAppContext } from '@/context/provider'



const startSearch = () => {

};

const HomeSearch = () => {
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const { sharedState, setSharedState } = useRegisteredContext();
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
  const [account, setAccount] = useState();
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const {readContract,address} =  useAppContext()


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

  const handleProfileCheck = () => {

    !isCreated ? setSharedState(true) : router.push('/dash');

  }

  const handleStateChange = useCallback(() => {
    // logic to handle the state change goes here
    console.log('State changed:', sharedState);
    // ROUTE TO THE USER PROFILE PAGE
  }, [sharedState]);

  useEffect(() => {
    handleStateChange();
  }, [sharedState, handleStateChange]);



  return (
    <div className='shadow-lg items-center py-1'>
      <div className='menuBar flex flex-grow md:flex-row mx-5 md:mx-20 my-5 md:justify-between gap-2 md:gap-0 '>
        <div className='smx:w-[100%] flex mx-auto justify-end items-center w-[70rem]lmx:w-[100%] ring-1 ring-[var(--terracota)] h-10 p-5 pr-0 rounded-3xl smx:mx-auto smx:justify-end smx:mt-2 shadow-lg'>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="..."
            className='outline-none bg-transparent focus:outline-none w-[80%] smx:w-[100%] mr-6' />
          <button
            type="button"
            className=' bg-[var(--terracota)] text-white px-2 w-[150px] smx:w-[80%] py-2 rounded-3xl flex items-center'
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
      {sharedState && ( <ProfileForm /> )}
    </div>
  );
};

export default HomeSearch;