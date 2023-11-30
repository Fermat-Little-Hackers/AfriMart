import React from 'react'
import ProductCard from "../../../components/market-place/productCard"


const TrendingProducts = () => {
  return (
    <div className=" mx-5 md:mx-20 h-fit md:h-[60vh] px-0 md:p-10 flex flex-col gap-4 md:gap-4 mt-10 md:mt-20">
        <div className="">
            <p className='font-serif text-2xl'>
                TRENDING PRODUCTS
            </p>                    
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-16">
          <div className='flex flex-row w-[100%] md:w-[50%] gap-3 md:gap-16'>
            <div className='w-[50%]'>
            <ProductCard productId={1} />
            </div>
            <div className='w-[50%]'>
            <ProductCard productId={1} />
            </div>
          </div>

          <div className='flex flex-row w-[100%] md:w-[50%] gap-3 md:gap-16'>
            <div className='w-[50%]'>
            <ProductCard productId={1} />
            </div>
            <div className='w-[50%]'>
            <ProductCard productId={1} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default TrendingProducts