"use client"

import { usePathname, useParams } from "next/navigation";
import Search from '../../../components/market-place/search'
import ProductsDetails from './components/productsDetails'
import ProductsReviews from './components/productsReviews'
import SimilarProducts from './components/similarProducts'
import { useAccount } from "@starknet-react/core";
import OurPartners from "../../../components/market-place/ourPartners"

export default function Home() {
    const { account, address, status } = useAccount();

    const id = useParams()

    console.log(`testinggg ${id.id}`);

    return(
        <div>
            <Search />
            <ProductsDetails itemId={Number(id.id)} />
            <ProductsReviews />
            <SimilarProducts />
            <OurPartners />
        </div>
    )
}