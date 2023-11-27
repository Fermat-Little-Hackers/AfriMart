import React from 'react'
import ProductCard from "../../../components/market-place/productCard"


const TrendingProducts = () => {
  return (
    <div className="md:border-2 md:border-black mx-5 md:mx-20 h-fit md:h-[60vh] px-0 md:p-10 flex flex-col gap-5 md:gap-7 mt-10 md:mt-20">
        <div className="">
            <p>
                TRENDING PRODUCTS
            </p>                    
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-16">
          <div className='flex flex-row w-[100%] md:w-[50%] gap-3 md:gap-16'>
            <div className='w-[50%]'>
            <ProductCard name='Ashoki material' price={100} />
            </div>
            <div className='w-[50%]'>
            <ProductCard name='Ashoki material' price={100} />
            </div>
          </div>

          <div className='flex flex-row w-[100%] md:w-[50%] gap-3 md:gap-16'>
            <div className='w-[50%]'>
            <ProductCard name='Ashoki material' price={100} />
            </div>
            <div className='w-[50%]'>
            <ProductCard name='Ashoki material' price={100} />
            </div>
          </div>
        </div>
    </div>
  )
}

export default TrendingProducts