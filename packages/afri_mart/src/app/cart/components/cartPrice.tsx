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
    <div className=' bg-white rounded-xl   h-fit md:w-[35%] p-4 md:p-10'>
        <p className='md:mb-7 mb-5 text-3xl font-bold'>PRICE</p>
        <div className='w-[100%] flex flex-col gap-2'>
            <div className='flex flex-row w-[100%] gap-5'>
                <div className='w-[65%]'> <p> Price</p></div>
                <div className='w-[35%]'><p>$600</p></div>
            </div>
            <div className='flex flex-row w-[100%] gap-5'>
                <div className='w-[65%]'> <p> Delivery Fee</p></div>
                <div className='w-[35%]'><p>$50</p></div>
            </div>
            <hr className='mt-4'></hr>

            <div className='flex flex-row w-[100%] gap-5'>
                <div className='w-[65%] font-bold text-xl'> <p> Total Fee</p></div>
                  <div className='w-[35%] font-bold text-xl'><p>$650</p></div>
            </div>
        </div>
        <div className='mt-7'>
        <button
            type="button"
            className='bg-green-500  px-4 py-2 rounded-lg w-[100%]'
            onClick={handleCheckoutClick}
        >
            CHECK OUT
        </button>

        {/* Popup */}
        {sharedState && (
            <ConfirmPurchasePopUp itemName=' ' price={650} />
        )}
        </div>

    </div>
  )
}

export default CartPrice