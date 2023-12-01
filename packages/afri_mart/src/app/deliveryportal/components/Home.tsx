import React from 'react'
import deliveryImage from "../../../../public/DeliveryPortal.jpeg";
import Image from 'next/image';

const Home = () => {
  return (
    <div>
        <p className='md:text-3xl font-bold m-0 p-4'>Welcome to Afrimart Delivery Portal </p>
        <Image src={deliveryImage} alt='Delivery man' />
    </div>
  )
}

export default Home