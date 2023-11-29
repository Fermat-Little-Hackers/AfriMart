import React, {useState, useEffect} from "react";
import Soldcard from "./Soldcard";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";

const SoldItems = () => {
const [allSold, setAllSold] = useState<any[]>([])
const [allProductSold, setAllproductSold] = useState<any[]>([]);


  
  const getAllsolditem = async () => {
    const provider = new Provider({
      rpc: {
        nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx',
      },
    });

    try {
      const connection = await connect({ modalMode: 'neverAsk', webWalletUrl: 'https://web.argent.xyz' });
      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);
      const allsoldData = await contract.getItemsSold(
        connection?.selectedAddress?.toString()
      );
      // setAllSold([...allsoldData]);
      console.log(allsoldData);
    } catch (error : any) {
      console.log(error)
  };
}

const GetProductSold = async (args : number[] | undefined) => {
  const provider = new Provider({
    rpc: {
      nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx',
    },
  });

  try {
    const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);  
    //@ts-ignore
    const promises = args.map(async (productId) => {
      if(productId != 0x0){
        let productdetail = await contract.getProductDetails(productId.toString());
        return productdetail;
      }
    });
    const results = await Promise.all(promises);
    return results
  } catch (error: any) {
    console.log(error)
  }
};
  
useEffect(() => {
  getAllsolditem()
}, [])

useEffect(() => {
  if(allSold.length > 0){
    GetProductSold(allSold).then((products)=>{
      console.log('sold product collected', products)
      //@ts-ignore
      setAllproductSold(products)
    }).catch((error)=>{
        console.log(error)
    })
  }
}, [allSold]); 

  const data = [
    {
      title : 'Ofa Material',
      amount : 100,
      quantity : 2      
    },  {
      title : 'Ebonyi Material',
      amount : 550,
      quantity : 3      
    },
  ]
  return <div className="smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[800px] smx:w-[80%] lmx:w-[90%] h-[80%] p-6 mt-2">
     {data.map((item,index) => (             
       <div key={index} className="w-[20%] space-y-10">
       <Soldcard title={item.title} amount={item.amount} quantity={item.quantity} />
     </div>                
        ))}
  </div>;
};

export default SoldItems;
