import ProductCard from "../../../components/market-place/productCard"
import React, {useState, useEffect} from "react";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants,CairoCustomEnum, CallData } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";
import Link from "next/link";
import { useLoadingContext } from "@/context/connectionContext";


interface filterProps {
    title: string;
    enumoption : number;
}

const Filterdisplay : React.FC<filterProps> = ({ title, enumoption})  => {
  const [products, setProducts] = useState<string[]>();
  const {ShareLoad, setShareLoad} = useLoadingContext();


   
    const getProduct = async() => {
        const provider = new Provider({
          rpc: {
            nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
          }
        })
          try {
          const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider);
          const myCustomEnum = new CairoCustomEnum({
            cartegory: enumoption ? enumoption : 0,
            });
    
            //@ts-ignore
            const myCalldata = CallData.compile(myCustomEnum);
            const res: any = await contract.call("getProductsByCategory", myCalldata) as bigint;
            const products = res.map((item:any) => item.toString())
            setProducts(products);
          } catch (error : any) {      
            console.log(error.message);
          }
    }
   
   
    useEffect(() => {
        getProduct();
      }, [title, enumoption])
   
      useEffect(() => {
        setShareLoad(false)

      }, [products])
      
   
    return (
        <div className=" h-80 overflow-y-auto scrollbar w-[100%] smx:w-[100%] shadow-lg rounded-lg ring-1 ring-red-100 lmx:w-[95%] mt-10 smx:mt-4 p-4">
            <div className="w-full mx-auto">
                <p>
                {title}
                </p>                    
            </div>
                <section className="flex gap-10 flex-wrap smx:flex-col-2 mt-[20px] ">    
                {products?.length == 0 ? <div className="text-center mx-auto">No item in category</div> : products?.map((item,index) => (             
                 <Link href={`/Product/${item}`} key={index} className="w-[20%] smx:w-[40%]">
                 <ProductCard productId={Number(item)} />
               </Link>                
                  ))}
                  </section>
        </div>
      )
}

export default Filterdisplay