import React from "react";
import Puchasecard from "./Puchasecard";

interface filterProps {
    title : string;
}
const AllPurchases : React.FC<filterProps> = ({ title})  => {
  const data = [
    {
      title : 'Ashoke Material',
      amount : 150,
      quantity : 5      
    },  {
      title : 'Edo Material',
      amount : 100,
      quantity : 2      
    },  {
      title : 'Akure Material',
      amount : 550,
      quantity : 3      
    },
  ]

  return     <div className="md:border-2 md:border-black mx-auto w-[800px] md:mx-auto h-fit md:h-[60vh] px-0 md:p-10 mt-10 md:mt-20">
  <div className="w-full mx-auto">
      <p>
      {title}
      </p>                    
  </div>
      <section className="">    
      {data.map((item,index) => (             
       <div key={index} className="w-[20%]">
       <Puchasecard title={item.title} amount={item.amount} quantity={item.quantity} />
     </div>                
        ))}
        </section>
</div>
};

export default AllPurchases;
