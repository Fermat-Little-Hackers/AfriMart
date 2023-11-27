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

  return    ( <div className="border-2 border-black smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto smx:w-auto w-[800px] smx:w-[80%] lmx:w-[90%] h-fit md:h-[60vh] p-6 mt-20">
  <div className="w-full smx:w-[100%] mx-auto">
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
</div>)
};

export default AllPurchases;
