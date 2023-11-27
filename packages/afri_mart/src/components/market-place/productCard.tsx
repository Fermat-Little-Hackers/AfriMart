import React from 'react'
import Stars from './stars'

interface MyProps {
  name: string;
  price: number;
}

const ProductCard : React.FC<MyProps> = ({ name, price }) => {
  return (
    <div className="border-2 border-black w-[100%] h-fit md:h-60 p-2 md:p-3">
    <div className="border-2 border-black h-[6rem] md:h-[60%] w-[100%] bg-gray-700">
    </div>
    <div className="mt-2 flex flex-col gap-1">
          <p>{name}</p>
          <p>${price}</p>
          <Stars amount={3.5}/>
      </div>
  </div>
  )
}

export default ProductCard
