'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from "../../../components/market-place/productCard"
import { Account, Contract, Provider, constants, AccountInterface, CairoCustomEnum, CallData } from 'starknet'
import marketPlaceAbi from '@/ABI/marketPlace'
import { MarketPlaceAddr } from '@/components/addresses'
import Link from 'next/link'
import { useAppContext } from '@/context/provider'



const TrendingProducts = () => {
  const [products, setProducts] = useState<Number[]>();
  const {readContract} = useAppContext();


  const getProduct = async() => {
      try {
        const res: any = await readContract.call("getAllProducts", []);
        setProducts(getRandomNumbersFromArray(res));
        // console.log(`RANDOM PRODUCTS`, getRandomNumbersFromArray(res));
        // const products = res.map((item:any) => item.toString())
        // setProducts(products);
      } catch (error : any) {      
        console.log(error.message);
      }
}

      useEffect(() => {
        getProduct()
      }, [])
  




  function getRandomNumbersFromArray(inputArray: number[]): number[] {
    const outputArray: number[] = [];
  
    // Check if the inputArray has at least 1 number
    if (inputArray.length === 0) {
      throw new Error('Input array must have at least 1 number.');
    }
  
    // Repeat numbers until outputArray has at least 8 numbers
    while (outputArray.length < 8) {
      // Copy numbers from the inputArray
      for (const number of inputArray) {
        outputArray.push(number);
  
        // Break the loop if outputArray has at least 8 numbers
        if (outputArray.length === 8) {
          break;
        }
      }
    }
  
    // Shuffle the outputArray using Fisher-Yates algorithm
    for (let i = outputArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
    }
  
    // Select the first 8 numbers
    const selectedNumbers = outputArray.slice(0, 8);
  
    return selectedNumbers;
  }

  return (
    <div className=" mx-5 my-4 md:mx-20 h-fit md:h-fit px-0 md:p-10 flex flex-col gap-4 md:gap-4 md:mt-4 md:mb-20">
        <div className="">
            <p className='font-serif text-2xl mb-4 md:mb-7'>
                TRENDING PRODUCTS
            </p>                    
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

export default TrendingProducts