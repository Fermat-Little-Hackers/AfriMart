import React, {useState, useEffect} from "react";
import Puchasecard from "./Puchasecard";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";

const AllPurchases =  ()  => {  
const [allPurchase, setAllPurchase] = useState<any[]>([])
const [allProductArray, setAllproductArray] = useState<any[]>([]);

  const getAllpurchase = async () => {
    const provider = new Provider({
      rpc: {
        nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx',
      },
    });

    try {
      const connection = await connect({ modalMode: 'neverAsk', webWalletUrl: 'https://web.argent.xyz' });
      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);
      const allPurchaseData = await contract.getProductsBoughtByUser(
        connection?.selectedAddress?.toString(),
        connection?.selectedAddress?.toString()
      );
      setAllPurchase([...allPurchaseData]);
    } catch (error : any) {
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

  const GetItem = async (args : number[] | undefined) => {
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
    } catch (error: any) {}
  };

  function hexToReadableText(hexString : any) {
    const bytes = Buffer.from(hexString, 'hex'); 
    const text = new TextDecoder('utf-8').decode(bytes);
    return text;
  }

useEffect(() => {
  getAllpurchase()
}, [])

  useEffect(() => {
    if(allPurchase.length > 0){
      GetOrder(allPurchase).then((orderidsArray)=>{
        // console.log('order id array collected', orderidsArray)
        GetItem(orderidsArray).then((products)=>{
          // console.log('products obtained array',products)
          //@ts-ignore
          setAllproductArray(products)
        })
      }).catch((error)=>{
          console.log(error)
      })
    }
  }, [allPurchase]); 
  
  return    ( <div className="smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[800px] smx:w-[80%] lmx:w-[90%] h-[80%] p-6 mt-2">   
      
      {allProductArray?.map( (item:any,index : number) => {  
          let productname =  hexToReadableText(item.name.toString(16)) 
          let productprice = Number(item.price)/1e18
         return ( <div key={index} className="w-[20%] space-y-10">          
         <Puchasecard title={productname} amount={productprice} quantity={0} />
       </div> )             
    })}
</div>)
};

export default AllPurchases;
