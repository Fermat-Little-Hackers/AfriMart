import Search from '../../components/market-place/search'
import OurPartners from '../../components/market-place/ourPartners'
import TrendingProducts from './components/trendingProducts'
import CartContent from './components/cartContent'
import React from 'react'
import { Brands } from '@/components/sections/Brands';

export default function Home() {
    return (
        <div
            className=''
        >
            <Search />
            <CartContent />
            <TrendingProducts />
            <OurPartners />
            {/* <Brands /> */}
        </div>
    )
}