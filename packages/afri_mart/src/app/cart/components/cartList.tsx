'use client'
import React, { useEffect, useState } from 'react'
import CartItem from './cartItem'
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import marketPlaceAbi from '@/ABI/marketPlace'
import { MarketPlaceAddr } from '@/components/addresses'
import Link from 'next/link'
import { useLoadingContext } from "@/context/connectionContext";


const CartList = () => {
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState('');
  const [cartDetails, setCartDetails] = useState<any[]>();
  const {ShareLoad, setShareLoad} = useLoadingContext();



  const getUserProfile = async() => {
    const provider = new Provider({
        rpc: {
          nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
        }
      })
      try {
        const contract = new Contract(marketPlaceAbi, MarketPlaceAddr(), provider)
        const details = await contract.getUsersCart(address);
        console.log(`usersCart:`, details);
        setCartDetails(details);

      } catch(error: any) {
        console.log(error.message);
      }
}




useEffect(() => {
  setShareLoad(false)
  getUserProfile();
}, [address])



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