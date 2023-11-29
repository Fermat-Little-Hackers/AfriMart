import React, {useState, useEffect} from "react";
import Puchasecard from "./Puchasecard";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";
// import { UsegetAlluserPurchase } from "@/utils/util";
import {useGetAllUserPurchase, useGetOrder} from "@/utils/util";


const AllPurchases = ()  => {
  
  const [address, setAddress] = useState('');
  const [purchaseArray, setPurchaseArray] = useState<any[]>([]);
  
  
  const {allPurchase, loading, error} = useGetAllUserPurchase();
  const [newPurchaseAray, setNewpurchaseArray] = useState<any[]>([]);
  const orderArray = useGetOrder(newPurchaseAray)
  const [neworderArray, setneworderArray] = useState<any[]>();
  

  // }

  // const getProductInfo = async () =>{
  //   const provider = new Provider({  
  //     rpc: {
  //        nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx"
  //      }
  //    })
  //      try {
  //      const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider)
  //      const productinformation = await contract.getProductDetails(itemid.toString());
  //         console.log(productinformation) 
  //      } catch (error : any) {

  //      }
  // }
  
  // const fetchAll = () =>{
  //    getAlluserPurchase().then(()=>{getOrderInfo()})
  // }
  
  useEffect(() => {
    // const connectToStarknet = async() => {
    //   // const connection = await connect({ modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" })
    //   if(connection && connection.isConnected) {
    //     setAddress(connection.selectedAddress)
    //   }
    // }
    // connectToStarknet()
    // fetchAll();

    // setPurchaseArray([returned])
   
    // console.log(orderArray)
    if(allPurchase){
      const numbersArray = allPurchase.map((bigintValue) => Number(bigintValue));
      setNewpurchaseArray(numbersArray)
    }
    if(orderArray){
      const resolve = async () => {
        let result : { orderArray: number[] } = await orderArray;
        console.log(result)
        // setneworderArray(result)
      }
      resolve()
    }
  },[allPurchase,orderArray])  


  const data = [
    {
      title : 'Ashoke Material',
      amount : 150,
      quantity : 5      
    },  {
      title : 'Edo Material',
      amount : 100,
      quantity : 2      
    },  {
      title : 'Akure Material',
      amount : 550,
      quantity : 3      
    },
  ]
  


  return    ( <div className="smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[800px] smx:w-[80%] lmx:w-[90%] h-[80%] p-6 mt-2">   
      
      {neworderArray?.map(async (item:number,index : number) => {    
         return ( <div key={index} className="w-[20%] space-y-10">          
         <Puchasecard title='null' amount={0} quantity={0} />
       </div> )             
    })}
</div>)
};

export default AllPurchases;
