'use client'
import React, { useEffect, useState } from "react";
import Stars from "./stars";
import marketplaceAbi from '../../ABI/marketPlace';
import { MarketPlaceAddr, RattingAddr } from '../../components/addresses';
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import TrendingPhoto from "./trendingPhoto";
import rattingsContract from '@/ABI/rattingsContract.json';




interface MyProps {
  productId: number;
}

const ProductCard: React.FC<MyProps> = ({ productId }) => {
  const [price, setPrice] = useState<any>();
  const [imgUri, setImgUri] = useState<any>();
  // const [imgUri2, setImgUri2] = useState<any>();
  const [name, setName] = useState<any>();
  const [rating, setRating] = useState<number>();

  const getProductDetails = async () => {
    const provider = new Provider({
      rpc: {
        nodeUrl:
          "https://starknet-goerli.infura.io/v3/571aaed99608415397cb4eb46ca740c4",
      },
    });
    try {
      const contract = new Contract(
        marketplaceAbi,
        MarketPlaceAddr(),
        provider
      );
      let eth = 1000000000000000000;
      const details = await contract.getProductDetails(productId);
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
    const provider = new Provider({
      rpc: {
        nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
      }
    })
      try {
          const contract = new Contract(rattingsContract, RattingAddr(), provider);
          const details = await contract.getProductRatting(productId);
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
    <div className="border-2 border-red-100 rounded-lg w-[100%] h-fit md:h-60 p-2 md:p-3">
      <TrendingPhoto uri={imgUri} />
      <div className="mt-2 flex flex-col gap-1">
        <p className=" font-bold">{name? name : 'loading...'}</p>
        <p>{price ? price : '0.00'} ETH</p>
        <Stars amount={rating ? rating : 0} />
      </div>
    </div>
  );
};

export default ProductCard;
