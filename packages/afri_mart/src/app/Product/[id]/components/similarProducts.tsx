import React, { useEffect } from 'react'
import ProductCard from "../../../../components/market-place/productCard"
// import { useAccount } from "@starknet-react/core";
// import OurPartners from "../../../../components/market-place/ourPartners"
import marketplaceAbi from '../../../../ABI/marketPlace'
import { MarketPlaceAddr } from '../../../../components/addresses';
import { Account, Contract, Provider, constants, AccountInterface, CairoCustomEnum, CallData } from 'starknet'
import { useState } from "react";
import {useContractRead} from '@starknet-react/core'
import { IconTeapot } from '@tabler/icons-react';
import Link from 'next/link';
import { useAppContext } from '@/context/provider'


interface MyProps {
  cartegory: string;
  cartegoryIndex: number;
}

const SimilarProducts:React.FC<MyProps>= ({cartegory, cartegoryIndex}) => {
  const [products, setProducts] = useState<string[]>();
  const {readContract} = useAppContext();


  const getProduct = async() => {
      try {
      
      const myCustomEnum = new CairoCustomEnum({
        cartegory: cartegoryIndex ? cartegoryIndex : 0,
        });

        //@ts-ignore
        const myCalldata = CallData.compile(myCustomEnum);
        const res: any = await readContract.call("getProductsByCategory", myCalldata) as bigint;
        const products = res.map((item:any) => item.toString())
        setProducts(products);
      } catch (error : any) {      
        console.log(error.message);
      }
}

      // const intervalId = setInterval(getProduct, 3000);

          useEffect(() => {
            getProduct();

          }, [cartegory, cartegoryIndex])



  return (
    <div className=" m-5 my-7 md:my-10 md:mx-20 h-fit md:h-fit px-0 md:p-10 flex flex-col gap-5 md:gap-7 ">
        <div className="">
            <h1 className='text-xl font-semibold'>
                SIMILAR PRODUCTS 
            </h1>                    
        </div>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-7 xl:gap-16'>
            {products?.map((product, index) => (
             <Link href={`/Product/${product}`} key={index}>
                <div key={index}>
                  <ProductCard productId={Number(product)} />
                </div>
            </Link>
            ))}    
          </div>
    </div>
  )
}

export default SimilarProducts