import React, { useEffect, useState } from "react";
import Stars from "./stars";
import marketplaceAbi from '../../ABI/marketPlace';
import { MarketPlaceAddr } from '../../components/addresses';
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'




interface MyProps {
  name: string;
  productId: number;
}

const ProductCard: React.FC<MyProps> = ({ productId }) => {
  const [price, setPrice] = useState<any>();
  const [imgUri, setImgUri] = useState<any>();
  const [name, setName] = useState<any>();

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
      setImgUri(details.imageUri.toString(16));
      setPrice(Number(BigInt(details.price)) / eth);
      
      console.log(`item details`,details);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProductDetails();

  }, [productId])
  
  function hexToReadableText(hexString : any) {
    const bytes = Buffer.from(hexString, 'hex'); 
    const text = new TextDecoder('utf-8').decode(bytes);
    return text;
  }

  return (
    <div className="border-2 border-black w-[100%] h-fit md:h-60 p-2 md:p-3">
      <div className="border-2 border-black h-[6rem] md:h-[60%] w-[100%] bg-gray-700"></div>
      <div className="mt-2 flex flex-col gap-1">
        <p>{name? name : 'loading...'}</p>
        <p>{price ? price : '0.00'} ETH</p>
        <Stars amount={3.5} />
      </div>
    </div>
  );
};

export default ProductCard;
