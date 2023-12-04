import React,{useState, useEffect} from "react";
import Listcard from "./Listcard";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";
import { setInterval } from "timers";
import { useConnectionContext } from "@/context/connectionContext";
import CompLoad from "./compLoad";
import { useAppContext } from '@/context/provider'



const ListedItems = () => {
  const [allListedItem, setAllListed] = useState<any[]>([]);
  const [allProductArray, setAllproductArray] = useState<any[]>([]);
  const {ShareAddress, setShareAddress} = useConnectionContext()
const [sectionload, setSectionLoad] = useState(true);
const {readContract,address} = useAppContext();



  const getAllListing = async () => {
 
    try {
      const allPurchaseData = await readContract.getProductsListedByUser(
        address.toString(),
        address.toString()
      );
      setAllListed([...allPurchaseData]);
    } catch (error : any) {
  };
}
  
const getProduct = async (args : number[] | undefined) => {
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
  getAllListing()
}, [])



useEffect(() => {
  if(allListedItem){
    setTimeout(() => {
      if(allListedItem.length == 0 || allListedItem.length > 0 ){
        getProduct(allListedItem).then((products)=>{
          // console.log('product collected', products)
          //@ts-ignore
          setAllproductArray(products)
          setSectionLoad(false)
        }).catch((error)=>{
            console.log(error)
        })
      }
    }, 1000);
   
  }
  

}, [allListedItem]); 

  

  return    ( <div className="h-64 overflow-y-auto scrollbar scrollbar-thin smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 mx-auto w-[100%] smx:w-[80%] lmx:w-[90%] p-6 mt-2">   
      {sectionload  && <CompLoad />}
      {allProductArray?.length == 0 && !sectionload ? <div className="text-center">No item Listed</div> : allProductArray.map((item,index) => {             
       let firstHash =  hexToReadableText(item.imageUri1.toString(16)) 
       let secondHash =  hexToReadableText(item.imageUri2.toString(16)) 
        let cid = `${firstHash + secondHash}`
        // console.log(cid);
       let productname =  hexToReadableText(item.name.toString(16)) 
       let productprice = Number(item.price)/1e18
       let available = Number(item.amountAvailable)
      return <div key={index} className="w-[20%] space-y-10">
       <Listcard title={productname} amount={productprice} quantity={available} uri={cid} />
     </div>                
        })}
</div>)
};

export default ListedItems;
