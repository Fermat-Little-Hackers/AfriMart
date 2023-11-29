import React from 'react'
import ProductCard from "../../../../components/market-place/productCard"
// import { useAccount } from "@starknet-react/core";
// import OurPartners from "../../../../components/market-place/ourPartners"
import marketplaceAbi from '../../../../ABI/marketPlace'
import { MarketPlaceAddr } from '../../../../components/addresses';
import { Account, Contract, Provider, constants, AccountInterface, CairoCustomEnum, CallData } from 'starknet'
import { useState } from "react";
import {useContractRead} from '@starknet-react/core'


const SimilarProducts = ({cartegory}) => {

  console.log(cartegory);

  const getProduct = async() => {
    const provider = new Provider({
      rpc: {
        nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
      }
    })
      try {
      // const myCustomEnum = new CairoCustomEnum({cartegory});
      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);
      // const res14 = await contract.call("getProductsByCategory", [myCustomEnum]) as bigint;
      // const res14 = await contract.call("getProductsByCategory", [new CairoCustomEnum({ cartegory: {} })]) as bigint;
      console.log(`detailllllls`);
      // console.log(`detailllllls ${res14}`);

    const myCustomEnum = new CairoCustomEnum({
        Agriculture: {},
        TextileAndClothings: undefined,
        Accesories: undefined,
        ToolsAndEquipments: undefined,
        DigitalArts: undefined,
        PhysicalArtsNDSculptures: undefined,
        });

      // const myCalldata = CallData.compile(myCustomEnum);
      // const res = await contract.call("test2a", myCalldata) as bigint;

      } catch (error : any) {      
        console.log(error.message);
      }
}
    getProduct();


    const { data, isLoading, error, refetch } = useContractRead({
      address: MarketPlaceAddr(),
      abi: marketplaceAbi,
      functionName: 'getProductsByCategory',
      args: [0],
      watch: true
    })

    console.log(`Testing:... ${error}`)



  return (
    <div className="md:border-2 md:border-black mx-5 md:mx-20 h-fit md:h-fit px-0 md:p-10 flex flex-col gap-5 md:gap-7 mt-10 md:mt-20">
        <div className="">
            <p>
                SIMILAR PRODUCTS 
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

export default SimilarProducts