import ProductCard from "../../../components/market-place/productCard"


const Trendingbar = () => {
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
            name : 'Egbado Material',
            price : 300
        },
    ]
    return (
        <div className="border-2 border-black mx-auto w-[1000px] smx:mx-[30px] smx:w-[70%] lmx:w-[95%] smx:mt-5 h-[60vh] smx:h-[65vh] p-10 lmx:p-[5px] smx:p-[5px] mt-20">
            <div className="w-full mx-auto">
                <p>
                TRENDING PRODUCTS
                </p>                    
            </div>
                <section className="flex gap-10 smx:flex-col-2 flex-wrap mt-[20px] justify-center">    
                {items.map((item,index) => (             
                 <div key={index} className="w-[20%] smx:w-[40%]">
                 <ProductCard name={item.name} price={item.price} />
               </div>                
                  ))}
                  </section>
        </div>
      )
}

export default Trendingbar