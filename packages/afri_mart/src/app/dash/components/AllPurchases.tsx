import React, {useState, useEffect} from "react";
import Puchasecard from "./Puchasecard";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";
import { useConnectionContext } from "@/context/connectionContext";
import CompLoad from "./compLoad";
import { useAppContext } from '@/context/provider'




const AllPurchases =  ()  => {  
const [allPurchase, setAllPurchase] = useState<any[]>([])
const [allProductArray, setAllproductArray] = useState<any[]>([]);

const [sectionload, setSectionLoad] = useState(true);
const {readContract,address} = useAppContext();



  const getAllpurchase = async () => {
    try {
      const allPurchaseData = await readContract.getProductsBoughtByUser(
        address.toString(),
        address.toString()
      );
      setAllPurchase([...allPurchaseData]);
    } catch (error : any) {
  };
}

  const GetOrder = async (args : any[]) => {
    try { 
      const promises = args.map(async (orderId) => {
        let nextId = await readContract.getOrderDetails(orderId.toString());
        return Number(nextId.itemID);
      });
      const results = await Promise.all(promises);
      return results
    } catch (error: any) {}
  };

  const GetItem = async (args : number[] | undefined) => {
    try { 
      //@ts-ignore
      const promises = args.map(async (productId) => {
        let productdetail = await readContract.getProductDetails(productId.toString());
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
    if(allPurchase){
      setTimeout(() => {
      if(allPurchase.length > 0 || allPurchase.length == 0){
        GetOrder(allPurchase).then((orderidsArray)=>{
          // console.log('order id array collected', orderidsArray)
          GetItem(orderidsArray).then((products)=>{
            // console.log('products obtained array',products)
            //@ts-ignore
            setAllproductArray(products)
            setSectionLoad(false)
          })
        }).catch((error)=>{
          setSectionLoad(false)
            console.log(error)
        })
      }
    }, 1000);
    }
  }, [allPurchase]); 
  
  return    ( <div className=" h-64 overflow-y-auto scrollbar  smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[100%] smx:w-[80%] lmx:w-[90%] p-6 mt-2">   
      {sectionload && <CompLoad />}
      {allProductArray?.length == 0 && !sectionload ? <div className="text-center">No item purchased</div> : allProductArray?.map( (item:any,index : number) => {  
          let eth = 1000000000000000000;
          let productname =  hexToReadableText(item.name.toString(16)) 
          let productprice = Number(BigInt(item.price)) / eth
          let firstHash =  hexToReadableText(item.imageUri1.toString(16)) 
          let secondHash =  hexToReadableText(item.imageUri2.toString(16)) 
           let cid = `${firstHash + secondHash}`
           let available = Number(item.amountAvailable)
         return ( <div key={index} className="w-[20%] space-y-10">          
         <Puchasecard title={productname} amount={productprice} quantity={0} uri={cid} />
       </div> )             
    })}
        
</div>)
};

export default AllPurchases;
