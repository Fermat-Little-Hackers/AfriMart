import React from 'react'
import ProductAmountButton from './productButton'
import Stars from '../../../../components/market-place/stars'
import { useYourContext } from '../../../../context/YourContext';
import ConfirmPurchasePopUp from '@/components/market-place/confirmPurchasePopUp';
import { useAccount, useContractRead } from "@starknet-react/core";
import { MarketPlaceAddr } from '../../../../components/addresses';
import { useEffect } from 'react';
import marketplaceAbi from '../../../../ABI/marketPlace'
import { Contract, Provider, constants } from 'starknet'


const ProductsDetails = () => {
  const { account, address, status } = useAccount();
    const { sharedState, setSharedState} = useYourContext();
    const handlePurchaseClick = () => {
        // Open the popup when the "CHECK OUT" button is clicked
        setSharedState(true);
    };

    const { data, isLoading, error, refetch } = useContractRead({
        address: MarketPlaceAddr(),
        abi: marketplaceAbi,
        functionName: 'getAllProducts',
        watch: true
      })

      useEffect(() => {
          console.log(`TEST222: ${data?.toString()}`);
      }, [data])




  return (
    <div className="flex flex-col md:flex-row md:gap-10 md:mx-20 my-5 md:my-20 md:h-[65vh] md:p-0">
        <div className="flex flex-col md:w-[40%] gap-4">
            <div className=" bg-[var(--afroroasters-brown)] md:w-[20rem] h-[20rem]"></div>
            <div className='flex flex-col gap-2'>
                <div>
                    <Stars amount={2.5}/>
                </div>
                <p> Seller: Dorcas James</p>
                {/* <p> Seller Address: 0x0h7y34.....7ys98s</p> */}
            </div>
        </div>

        <div className=" h-fit w-[100%] flex flex-col justify-between mt-5 md:mt-0 gap-4">
            <div className='flex flex-col gap-4 md:p-0'>
                <h1 className='text-3xl font-semibold'>DANSHIKI MARTERIAL</h1>
            <div className="mr-10 w-[100%] h-fit md:h-[45%]  md:mt-5">
                <p>
                    Anim ipsum adipisicing irure dolor pariatur veniam culpa quis labore deserunt nulla amet proident. Exercitation consectetur deserunt velit velit laboris ad. Ullamco labore veniam laborum mollit occaecat consequat ullamco consectetur. 
                </p>
            </div>
                <p>$50</p>
                <ProductAmountButton />
                <div className="flex flex-row gap-10">
                    <button
                        type="button"
                        className='bg-blue-500 text-white px-4 py-2 rounded-3xl'
                        onClick={handlePurchaseClick}
                    >
                        ADD TO CART
                    </button>
                    <button
                        type="button"
                        className=' bg-blue-500 text-white px-4 py-2 rounded-3xl'
                        onClick={handlePurchaseClick}
                    >
                        BUY NOW
                    </button>
                </div>
            </div>
        </div>
        {/* Popup */}
        {sharedState && (
            <ConfirmPurchasePopUp itemName={' of DANSHIKI MARTERIAL'} price={50} />
        )}
    </div>
  )
}

export default ProductsDetails