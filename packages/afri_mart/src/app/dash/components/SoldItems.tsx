import React from "react";
import Soldcard from "./Soldcard";

const SoldItems = () => {
  const data = [
    {
      title : 'Ofa Material',
      amount : 100,
      quantity : 2      
    },  {
      title : 'Ebonyi Material',
      amount : 550,
      quantity : 3      
    },
  ]
  return <div className="smx:border-2 lmx:border-2 lmx:p-6 smx:p-4 smx:border-black lmx:border-black mx-auto w-[800px] smx:w-[80%] lmx:w-[90%] h-[80%] p-6 mt-2">
     {data.map((item,index) => (             
       <div key={index} className="w-[20%] space-y-10">
       <Soldcard title={item.title} amount={item.amount} quantity={item.quantity} />
     </div>                
        ))}
  </div>;
};

export default SoldItems;
