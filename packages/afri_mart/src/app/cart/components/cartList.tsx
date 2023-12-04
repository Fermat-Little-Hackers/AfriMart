'use client'
import React, { useEffect, useState } from 'react'
import CartItem from './cartItem'
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import marketPlaceAbi from '@/ABI/marketPlace'
import { MarketPlaceAddr } from '@/components/addresses'
import Link from 'next/link'
import { useLoadingContext } from "@/context/connectionContext";
import { useAppContext } from '@/context/provider'



const CartList = () => {
  const [cartDetails, setCartDetails] = useState<any[]>();
  const {ShareLoad, setShareLoad} = useLoadingContext();
  const {readContract,address} = useAppContext();
  


  const getUserProfile = async() => {
      try {
        const details = await readContract.getUsersCart(address);
        console.log(`usersCart:`, details);
        setCartDetails(details);
        setShareLoad(false)
      } catch(error: any) {
        setShareLoad(false)
        console.log(error.message);
      }
}

useEffect(() => {
  getUserProfile();
}, [])

  return (
    <div className='bg-white-200 shadow-lg ring-1 ring-orange-400 bg-art-bg rounded-lg h-fit md:w-[65%] flex flex-col gap-3 md:gap-5 md:p-10 p-3 min-h-[50vh]'>
      {cartDetails && cartDetails?.length > 0 ? cartDetails?.map((cart, index) => (
        <Link href={`/Product/${cart.itemID}`} key={index}>
          <CartItem ProductId={cart.itemID} amount={cart.amount} />
        </Link>
      )) : (<p className='text-white'>Cart is Empty</p>)}
  </div>
  )
}

export default CartList