import Search from '../../components/market-place/search'
import OurPartners from '../../components/market-place/ourPartners'
import TrendingProducts from './components/trendingProducts'
import CartList from './components/cartList'
import CartPrice from './components/cartPrice'

export default function Home() {
    return (
        <div>
            <Search />
            <div className='mx-20 h-fit pt-10 flex flex-col gap-7 mt-10'>
                <p> CART</p>
                <div className='flex flex-row gap-10'>
                    <CartList />
                    <CartPrice />
                </div>   
            </div>
            <TrendingProducts />
            <OurPartners />
        </div>
    )
}