'use client';
import Search from '../../components/market-place/search'
import OurPartners from '../../components/market-place/ourPartners'
import TrendingProducts from './components/trendingProducts'
import CartContent from './components/cartContent'
import React, { useEffect } from 'react'
import { Brands } from '@/components/sections/Brands';
import { useLoadingContext } from "@/context/connectionContext";
import LoadingOverlay from "@/components/Loading";




export default function Home() {
  const {ShareLoad, setShareLoad} = useLoadingContext();
  useEffect(() => {
    setShareLoad(true)
  }, [])
    return (
        <div
            className=''
        >
            {ShareLoad && <LoadingOverlay/>}
            <Search />
            <CartContent />
            <TrendingProducts />
            {/* <OurPartners /> */}
            <Brands />
        </div>
    )
}