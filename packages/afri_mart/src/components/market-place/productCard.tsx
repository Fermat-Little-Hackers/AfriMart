'use client'
import React, { useEffect, useState } from "react";
import Stars from "./stars";
import marketplaceAbi from '../../ABI/marketPlace';
import { MarketPlaceAddr, RattingAddr } from '../../components/addresses';
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import TrendingPhoto from "./trendingPhoto";
import rattingsContract from '@/ABI/rattingsContract.json';
import { useAppContext } from '@/context/provider'

interface MyProps {
  productId: number;
}

const ProductCard: React.FC<MyProps> = ({ productId }) => {
  const [price, setPrice] = useState<any>();
  const [imgUri, setImgUri] = useState<any>();
  // const [imgUri2, setImgUri2] = useState<any>();
  const [name, setName] = useState<any>();
  const [rating, setRating] = useState<number>();
  const {readContract, readReviewContract} = useAppContext();


  const getProductDetails = async () => {
    try {
      let eth = 1000000000000000000;
      const details = await readContract.getProductDetails(productId);
      setName(hexToReadableText(details.name.toString(16)))
      setImgUri(hexToReadableText(details.imageUri1.toString(16)) + hexToReadableText(details.imageUri2.toString(16)));
      
      // setImgUri2(details.imageUri2.toString(16));

      setPrice(Number(BigInt(details.price)) / eth);
      
      // console.log(`item details`,details);
    } catch (error: any) {
      console.log(error.message);
    }
  };


  const getProductReview = async() => {
      try {
          const details = await readReviewContract.getProductRatting(productId);
          setRating(Number(details));
        // setProducts(details);
      } catch (error : any) {      
        console.log(error.message);
      }
  }



  useEffect(() => {
    getProductDetails();
    getProductReview();
  }, [productId])
  
  function hexToReadableText(hexString : any) {
    const bytes = Buffer.from(hexString, 'hex'); 
    const text = new TextDecoder('utf-8').decode(bytes);
    return text;
  }

  return (
    <div className="shadow-lg rounded-lg ring-1 ring-red-100 w-[100%] h-fit md:h-60 ">
      <TrendingPhoto uri={imgUri} />
      <div className="flex flex-col gap-1 p-4 ">
        <p className=" font-bold text-[15px] ">{name? (name.length > 12 ? `${name.slice(0, 10)}...` : name) : 'loading...'}</p>
        <p>{price ? price : '0.00'} ETH</p>
        <Stars amount={rating ? rating : 0} />
      </div>
    </div>
  );
};

export default ProductCard;
