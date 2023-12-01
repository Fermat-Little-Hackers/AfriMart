import React from 'react'
import deliveryImage from "../../../../public/DeliveryPortal.png";
import Image from 'next/image';

const Home = () => {
  return (
    <div className='m-0 p-8 justify-center'>
        <p className='md:text-3xl font-bold mx-20 my-10 p-4'>Welcome to Afrimart Delivery Portal </p>
        <div className='m-0 px-20'>
          <Image src={deliveryImage} alt='Delivery man' layout='respnsive'/>
          <p className='test-sm font-medium text-center'>Get your products delivered in a flash...</p>
        </div>
    </div>
  )
}

export default Home