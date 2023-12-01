import React from 'react'
import Stars from '../../../../components/market-place/stars'
import { FaUser } from 'react-icons/fa';
import { CheckIcon } from '@heroicons/react/20/solid';

const ProductsReviews = () => {
  return (
    <div className='bg-art-graphics p-5 md:p-12'>

    <div className=" bg-[var(--ivory)] rounded-md h-fit md:h-fit px-5 py-5 md:px-10 md:py-7 flex flex-col gap-5 md:gap-7 items-center md:w-max mx-auto">
        <div className="">
            <h1 className='md:text-4xl text-3xl text-ceter font-serif'>
                REVIEWS
            </h1>                    
        </div>

        <div className="flex flex-row gap-5 md:gap-10 ">
            <div className="">
                <div className="border-solid border-2 border-black h-[3rem] rounded-3xl w-[3rem] flex items-center justify-center">
                    <FaUser />
                </div>
            </div>
            <div className="w-[80%] flex flex-col gap-1">
                <p> Emmanuel John </p>
                <p> EVeniam commodo excepteur deserunt eu consequat nulla.mmanuel John </p>
                    <div>
                        <Stars amount={3}/>
                    </div>
            </div>
        </div>
        <div className="flex flex-row gap-5 md:gap-10 ">
            <div className="">
                <div className="border-solid border-2 border-black h-[3rem] rounded-3xl w-[3rem] flex items-center justify-center">
                    <FaUser />
                </div>
            </div>
            <div className="w-[80%] flex flex-col gap-1">
                <p> Emmanuel John </p>
                <p> EVeniam commodo excepteur deserunt eu consequat nulla.mmanuel John </p>
                    <div>
                        <Stars amount={2}/>
                    </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ProductsReviews