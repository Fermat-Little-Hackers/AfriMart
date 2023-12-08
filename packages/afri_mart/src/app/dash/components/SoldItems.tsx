import React, {useState, useEffect} from "react";
import Soldcard from "./Soldcard";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";
import { useConnectionContext } from "@/context/connectionContext";
import { useAppContext } from '@/context/provider'


const SoldItems = () => {
const [allSold, setAllSold] = useState<any[]>([])
const [allProductSold, setAllproductSold] = useState<any[]>([]);
const {readContract,address} = useAppContext();



  const getAllsolditem = async () => {
    try {
      const allsoldData = await readContract.getItemsSold(
        address.toString(),
      );
      setAllSold([...allsoldData]);
        console.log(allsoldData);
    } catch (error : any) {
      console.log(error)
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


const GetProductSold = async (args : number[] | undefined) => {
  try {
    //@ts-ignore
    const promises = args.map(async (productId) => {
        let productdetail = await readContract.getProductDetails(productId.toString());
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
          console.log('products sold obtained array',products)
          
        //@ts-ignore
        setAllproductSold(products)
      })
    }).catch((error)=>{
        console.log(error)
    })
  }
}, [allSold]); 

  return <div className=" md:max-h-[80vh] md:min-h-[17rem] overflow-y-auto scrollbar smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[100%] smx:w-[80%] lmx:w-[90%] p-6 mt-2">
     {allProductSold?.length == 0 ? <div className="text-center">No item Sold</div> : allProductSold.map((item,index) => {             
       let productname =  hexToReadableText(item.name.toString(16)) 
       let productprice = Number(item.price)/1e18
       let available = Number(item.amountAvailable)
       let firstHash =  hexToReadableText(item.imageUri1.toString(16)) 
       let secondHash =  hexToReadableText(item.imageUri2.toString(16)) 
        let cid = `${firstHash + secondHash}`
      return  <div key={index} className="w-[20%] space-y-10">
       <Soldcard title={productname} amount={productprice} quantity={available} uri={cid}  />
     </div>                
        })}
  </div>;
};

export default SoldItems;
