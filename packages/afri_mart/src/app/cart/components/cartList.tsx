import React from 'react'
import CartItem from './cartItem'

const CartList = () => {
  return (
    <div className='border-2 border-black h-fit md:w-[65%] flex flex-col gap-3 md:gap-5 md:p-10 p-3'>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
    </div>
  )
}

export default CartList