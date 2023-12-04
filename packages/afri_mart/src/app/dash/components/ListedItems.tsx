import React,{useState, useEffect} from "react";
import Listcard from "./Listcard";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";
import { setInterval } from "timers";
import { useConnectionContext } from "@/context/connectionContext";


const ListedItems = () => {
  const [allListedItem, setAllListed] = useState<any[]>([]);
  const [allProductArray, setAllproductArray] = useState<any[]>([]);
  const {ShareAddress, setShareAddress} = useConnectionContext()




  const getAllListing = async () => {
    const provider = new Provider({
      rpc: {
        nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx',
      },
    });

    try {
      // const connection = await connect({ modalMode: 'neverAsk', webWalletUrl: 'https://web.argent.xyz' });
      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);
      const allPurchaseData = await contract.getProductsListedByUser(
        ShareAddress.toString(),
        ShareAddress.toString()
      );
      setAllListed([...allPurchaseData]);
    } catch (error : any) {
  };
}
  
const getProduct = async (args : number[] | undefined) => {
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
  getAllListing()
}, [])



useEffect(() => {
  if(allListedItem.length > 0){
    getProduct(allListedItem).then((products)=>{
      // console.log('product collected', products)
      //@ts-ignore
      setAllproductArray(products)
    }).catch((error)=>{
        console.log(error)
    })
  }
}, [allListedItem]); 

  

  return    ( <div className="max-h-[80vh] md:min-h-[17rem] overflow-y-auto scrollbar scrollbar-thin smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[100%] smx:w-[80%] lmx:w-[90%] p-6 mt-2">   
      {allProductArray?.length == 0 ? <div className="text-center">No item Listed</div> : allProductArray.map((item,index) => {             
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
