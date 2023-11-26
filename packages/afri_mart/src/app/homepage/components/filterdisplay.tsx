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
        }
    ]
    return (
        <div className="md:border-2 md:border-black mx-auto w-[1400px] md:mx-auto h-fit md:h-[85vh] px-0 md:p-10 mt-10 md:mt-10">
            <div className="w-full mx-auto">
                <p>
                {title}
                </p>                    
            </div>
                <section className="flex gap-10 flex-wrap mt-[20px] justify-center">    
                {items.map((item,index) => (             
                 <div key={index} className="w-[20%]">
                 <ProductCard name={item.name} price={item.price} />
               </div>                
                  ))}
                  </section>
        </div>
      )
}

export default Filterdisplay