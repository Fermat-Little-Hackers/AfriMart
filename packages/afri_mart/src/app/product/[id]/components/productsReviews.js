import React from 'react'
import Stars from '../../../../components/market-place/stars'

const ProductsReviews = () => {
  return (
    <div className="border-2 border-black mx-20 h-[45vh] px-10 py-7 flex flex-col gap-7">
        <div className="">
            <p>
                REVIEWS
            </p>                    
        </div>

        <div className="flex flex-row gap-10">
            <div className="">
                <div className="border-solid border-2 border-black h-[3rem] rounded-3xl w-[3rem]"></div>
            </div>
            <div className="w-[80%] flex flex-col gap-1">
                <p> Emmanuel John </p>
                <p> EVeniam commodo excepteur deserunt eu consequat nulla.mmanuel John </p>
                    <div>
                        <Stars amount={3}/>
                    </div>
            </div>
        </div>
        <div className="flex flex-row gap-10">
            <div className="">
                <div className="border-solid border-2 border-black h-[3rem] rounded-3xl w-[3rem]"></div>
            </div>
            <div className="w-[80%]">
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