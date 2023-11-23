import React from 'react'
import ProductCard from "../../../components/market-place/productCard"


const TrendingProducts = () => {
  return (
    <div className="border-2 border-black mx-20 h-[60vh] p-10 flex flex-col gap-7 mt-20">
        <div className="">
            <p>
                TRENDING PRODUCTS
            </p>                    
        </div>
        <div className="flex flex-row justify-between">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>
  )
}

export default TrendingProducts