"use client"

import { usePathname, useParams } from "next/navigation";
import Search from '../../../components/market-place/search'
import ProductsDetails from './components/productsDetails'
import ProductsReviews from './components/productsReviews'
import SimilarProducts from './components/similarProducts'
import { useAccount } from "@starknet-react/core";
import OurPartners from "../../../components/market-place/ourPartners"
import marketplaceAbi from '../../../ABI/marketPlace'
import { MarketPlaceAddr } from '../../../components/addresses';
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import { useEffect, useState } from "react";
import { useLoadingContext } from "@/context/connectionContext";
import LoadingOverlay from "@/components/Loading";
import { useAppContext } from '@/context/provider'



export default function Home() {
    const [cartegory, setCartegory] = useState<String>();
    const [cartegory2, setCartegory2] = useState<Number>();
  const {ShareLoad, setShareLoad} = useLoadingContext();
  const {readContract, readReviewContract, contract} = useAppContext();



    const id = useParams();

    function findCategoryIndex(categoryName: string): number {
        const categories = [
          'Agriculture',
          'TextileAndClothings',
          'Accesories',
          'ToolsAndEquipments',
          'DigitalArts',
          'PhysicalArtsNDSculptures',
        ];
      
        const index = categories.indexOf(categoryName);
        return index;
    }


    const getProduct = async() => {

          try {
          const details = await readContract.getProductDetails(id.id);
            setCartegory2(findCategoryIndex(details.cartegory.activeVariant()))
            setCartegory(details.cartegory.activeVariant());
          } catch (error : any) {      
            console.log(error.message);
          }
    }

  const intervalId = setInterval(getProduct, 3000);
    useEffect(() => {
    setShareLoad(true)
    }, [])

   
    
    return(
        <div>
          {ShareLoad && <LoadingOverlay/>}
            <Search />
            <ProductsDetails itemId={Number(id.id)} />
            <ProductsReviews itemId={Number(id.id)}/>
            <SimilarProducts cartegory={cartegory as string} cartegoryIndex={cartegory2 as number} />
            <OurPartners />
        </div>
    )
}