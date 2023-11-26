import ProductCard from "../../../components/market-place/productCard"

interface filterProps {
    title: string;
}

const Filterdisplay : React.FC<filterProps> = ({ title})  => {
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
        <div className="border-2 border-black mx-auto w-[1400px] smx:w-[95%] mmx:w-[86%] lmx:w-[95%] p-10 smx:p-[5px] mt-10 smx:mb-16">
            <div className="w-full mx-auto">
                <p>
                {title}
                </p>                    
            </div>
                <section className="flex gap-10 flex-wrap smx:flex-col-2 mt-[20px] justify-center">    
                {items.map((item,index) => (             
                 <div key={index} className="w-[20%] smx:w-[40%]">
                 <ProductCard name={item.name} price={item.price} />
               </div>                
                  ))}
                  </section>
        </div>
      )
}

export default Filterdisplay