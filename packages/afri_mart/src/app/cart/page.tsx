import Search from '../../components/market-place/search'
import OurPartners from '../../components/market-place/ourPartners'
import TrendingProducts from './components/trendingProducts'
import CartContent from './components/cartContent'

export default function Home() {
    return (
        <div>
            <Search />
            <CartContent />
            <TrendingProducts />
            <OurPartners />
        </div>
    )
}