'use client'
import ConfirmPurchasePopUp from '@/components/market-place/confirmPurchasePopUp';
import React from 'react'
import { useYourContext } from '../../../context/YourContext';


const CartPrice = () => {
    const { sharedState, setSharedState} = useYourContext();

    const handleCheckoutClick = () => {
      // Open the popup when the "CHECK OUT" button is clicked
      setSharedState(true);
    };



  return (
    <div className='border-2 border-black h-fit w-[35%] p-10'>
        <p className='mb-7'>PRICE</p>
        <div className='w-[100%] flex flex-col gap-5'>
            <div className='flex flex-row w-[100%] gap-5'>
                <div className='w-[65%]'> <p> Price</p></div>
                <div className='w-[35%]'><p>$600</p></div>
            </div>
            <div className='flex flex-row w-[100%] gap-5'>
                <div className='w-[65%]'> <p> Delivery Fee</p></div>
                <div className='w-[35%]'><p>$50</p></div>
            </div>
            <div className='flex flex-row w-[100%] gap-5'>
                <div className='w-[65%]'> <p> Total Fee</p></div>
                <div className='w-[35%]'><p>$650</p></div>
            </div>
        </div>
        <div className='mt-7'>
        <button
            type="button"
            className='border-2 border-black text-black px-4 py-2 rounded-3xl w-[100%]'
            onClick={handleCheckoutClick}
        >
            CHECK OUT
        </button>

        {/* Popup */}
        {sharedState && (
            <ConfirmPurchasePopUp />
        )}
        </div>

    </div>
  )
}

export default CartPrice