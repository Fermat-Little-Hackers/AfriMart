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
      setAllSold([...allsoldData]);
    } catch (error : any) {
      console.log(error)
  };
}


const GetOrder = async (args : any[]) => {
  const provider = new Provider({
    rpc: {
      nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx',
    },
  });

  try {
    const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);  
    const promises = args.map(async (orderId) => {
      let nextId = await contract.getOrderDetails(orderId.toString());
      return Number(nextId.itemID);
    });
    const results = await Promise.all(promises);
    return results
  } catch (error: any) {}
};


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
        let productdetail = await contract.getProductDetails(productId.toString());
        return productdetail;
    });
    const results = await Promise.all(promises);
    return results
  } catch (error: any) {
    console.log(error)
  }
};

function hexToReadableText(hexString : any) {
  const bytes = Buffer.from(hexString, 'hex'); 
  const text = new TextDecoder('utf-8').decode(bytes);
  return text;
}

useEffect(() => {
  getAllsolditem()
}, [])

useEffect(() => {
  if(allSold.length > 0){
    GetOrder(allSold).then((orderidsArray)=>{
      GetProductSold(orderidsArray).then((products)=>{
        //@ts-ignore
        setAllproductSold(products)
      })
    }).catch((error)=>{
        console.log(error)
    })
  }
}, [allSold]); 

  return <div className="smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[800px] smx:w-[80%] lmx:w-[90%] h-[80%] p-6 mt-2">
     {allProductSold.length == 0 ? <div className="text-center">No item Sold</div> : allProductSold.map((item,index) => {             
       let productname =  hexToReadableText(item.name.toString(16)) 
       let productprice = Number(item.price)/1e18
       let available = Number(item.amountAvailable)
      return  <div key={index} className="w-[20%] space-y-10">
       <Soldcard title={productname} amount={productprice} quantity={available} />
     </div>                
        })}
  </div>;
};

export default SoldItems;
