import React from 'react'
import ProductCard from "../../../../components/market-place/productCard"
// import { useAccount } from "@starknet-react/core";
// import OurPartners from "../../../../components/market-place/ourPartners"
import marketplaceAbi from '../../../../ABI/marketPlace'
import { MarketPlaceAddr } from '../../../../components/addresses';
import { Account, Contract, Provider, constants, AccountInterface, CairoCustomEnum, CallData } from 'starknet'
import { useState } from "react";
import {useContractRead} from '@starknet-react/core'
import { IconTeapot } from '@tabler/icons-react';


const SimilarProducts= ({cartegory}) => {
  const [products, setProducts] = useState<string[]>();
  console.log(cartegory);

  const getProduct = async() => {
    const provider = new Provider({
      rpc: {
        nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
      }
    })
      try {
      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);
      const myCustomEnum = new CairoCustomEnum({
        cartegory: 0,
        });

        //@ts-ignore
        const myCalldata = CallData.compile(myCustomEnum);
        const res: any = await contract.call("getProductsByCategory", myCalldata) as bigint;
        console.log(`getProductsByCategory`, res);
        const products = res.map((item:any) => item.toString())
        console.log(products);
        setProducts(products);
      } catch (error : any) {      
        console.log(error.message);
      }
}
    getProduct();

  return (
    <div className="md:border-2 md:border-black mx-5 md:mx-20 h-fit md:h-fit px-0 md:p-10 flex flex-col gap-5 md:gap-7 mt-10 md:mt-20">
        <div className="">
            <p>
                SIMILAR PRODUCTS 
            </p>                    
        </div>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-7 xl:gap-16'>
            {products?.map((product, index) => (
              <div key={index}>
                <ProductCard productId={Number(product)} />
              </div>
            ))}    
          </div>
    </div>
  )
}

export default SimilarProducts