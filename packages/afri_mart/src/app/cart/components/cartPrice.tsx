'use client'
import ConfirmPurchasePopUp from '@/components/market-place/confirmPurchasePopUp';
import React, { useEffect, useState } from 'react'
import { useYourContext } from '../../../context/YourContext';
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants, ProviderInterface } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";


const CartPrice = () => {
    const { sharedState, setSharedState} = useYourContext();
    const [profileOwner, setProfileOwner] = useState("");
    const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
    const [account, setAccount] = useState();
    const [cartValue, setCartValue] = useState<any>();
    const [address, setAddress] = useState('');
  

    function formatDecimalTo5Places(inputNumber: any) {
        // Convert the input number to a fixed string with 5 decimal places
        const formattedNumber = Number(inputNumber).toFixed(5);
      
        // Convert the formatted string back to a number if needed
        const result = Number(formattedNumber);
      
        return result;
      }

    const handleCheckoutClick = () => {
      // Open the popup when the "CHECK OUT" button is clicked
      setSharedState(true);
    };

    const getCartValue = async() => {
      const provider = new Provider({
        rpc: {
          nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx"
  
        }
      })
        try {
        const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider)
        let Eth = 1000000000000000000;
        const cartValue = await contract.getCartValue(address.toString());
        //   const res = hexToReadableText(user.name.toString(16))
        // console.log(res)
        //    console.log('cart value', cartValue)
            setCartValue(Number(cartValue) / Eth);
        } catch (error : any) {
    
          console.log(error.message)
        }
    }
    getCartValue()
  
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
    <div className=' bg-white bg-grainy-pattern rounded-xl   h-fit md:w-[35%] p-4 md:p-10'>
        <p className='md:mb-7 mb-5 text-3xl font-bold'>PRICE</p>
        <div className='w-[100%] flex flex-col gap-2'>
            <div className='flex flex-row w-[100%] gap-5'>
                <div className='w-[60%]'> <p> Price</p></div>
                <div className='w-[40%]'><p> {cartValue ? formatDecimalTo5Places(cartValue) : '0.00'} Eth </p></div>
            </div>
            <div className='flex flex-row w-[100%] gap-5'>
                <div className='w-[60%]'> <p> Delivery Fee</p></div>
                <div className='w-[40%]'><p>{cartValue ? formatDecimalTo5Places((cartValue * 10) / 100) : '0.00'} Eth </p></div>
            </div>
            <hr className='mt-4 border-1 border-zinc-800'></hr>

            <div className='flex flex-row w-[100%] gap-5'>
                <div className='w-[60%] font-bold text-xl'> <p> Total Fee</p></div>
                <div className='w-[40%] font-bold text-xl'><p>{cartValue ? cartValue + ((cartValue * 10) / 100) : '0.00'} Eth</p></div>
            </div>
        </div>
        <div className='mt-12'>
        <button
            type="button"
            className='bg-green-500 font-bold text-sm   px-4 py-2 rounded-lg w-[100%]'
            onClick={handleCheckoutClick}
        >
            CHECK OUT -&gt;
        </button>

        {/* Popup */}
        {sharedState && (
            <ConfirmPurchasePopUp itemName=' ' price={cartValue + ((cartValue * 10) / 100)} id={1} amount={1} isCart={true} />
        )}
        </div>

    </div>
  )
}

export default CartPrice