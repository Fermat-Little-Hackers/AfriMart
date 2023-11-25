import React from 'react'
import Stars from '../../../../components/market-place/stars'
import { FaUser } from 'react-icons/fa';

const ProductsReviews = () => {
  return (
    <div className="border-2 border-black mx-5 md:mx-20 md:h-[45vh] px-3 py-3 md:px-10 md:py-7 flex flex-col gap-5 md:gap-7">
        <div className="">
            <p>
                REVIEWS
            </p>                    
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
  )
}

export default ProductsReviews