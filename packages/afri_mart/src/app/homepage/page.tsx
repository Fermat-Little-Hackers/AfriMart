"use client"
import HomeSearch from '../../components/market-place/homesearch'
import Sidefilter from './components/sidefilter'
import Filterdisplay from './components/filterdisplay'
import Trendingbar from './components/trendingbar'
import OurPartners from '@/components/market-place/ourPartners'
import { useState } from 'react'



const Homepage = () => {
  const [productTitle, setProductTitle] = useState('AGRICULTURE')
    const handleFilterClick = (message: string) =>{
    setProductTitle(message);
  }
  
    return (
    <div>
        <HomeSearch />
        <div className='flex space-x-24 justify-center'>
        <Sidefilter onClickAction={handleFilterClick} />
        <Trendingbar/>
        </div>
        <Filterdisplay title={productTitle} />
        <OurPartners />

    </div>
  )
}

export default Homepage