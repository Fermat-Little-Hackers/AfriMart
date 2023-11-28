import React from 'react'
import CartItem from './cartItem'

const CartList = () => {
  return (
    <div className='bg-white-200 shadow-lg ring-1 ring-orange-400 bg-art-bg rounded-lg h-fit md:w-[65%] flex flex-col gap-3 md:gap-5 md:p-10 p-3'>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
    </div>
  )
}

export default CartList