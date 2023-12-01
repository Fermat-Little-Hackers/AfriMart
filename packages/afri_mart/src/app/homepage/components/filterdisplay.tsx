import ProductCard from "../../../components/market-place/productCard"
import React, {useState, useEffect} from "react";
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { Contract, Provider, constants,CairoCustomEnum, CallData } from 'starknet'
import { MarketPlaceAddr } from '../../../components/addresses';
import marketplaceAbi from "@/ABI/marketPlace";
import Link from "next/link";

interface filterProps {
    title: string;
    enumoption : number;
}

const Filterdisplay : React.FC<filterProps> = ({ title, enumoption})  => {
  const [products, setProducts] = useState<string[]>();

   
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
   
   
   
   
    const items = [
        {
            name : 'Ashoki Material',
            price : 100
        },
        {
            name : 'Akure Material',
            price : 200
        },
        {
            name : 'Egbado Material',
            price : 300
        },
        {
            name : 'Ikare Material',
            price : 300
        },
    ]
    return (
        <div className=" w-[1400px] smx:w-[100%] lmx:w-[95%] p-10 smx:p-[5px] mt-10 smx:mb-16">
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