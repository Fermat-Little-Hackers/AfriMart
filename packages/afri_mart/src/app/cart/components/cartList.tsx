import React from 'react'
import CartItem from './cartItem'

const CartList = () => {
  return (
    <div className='border-2 border-black h-fit w-[65%] flex flex-col gap-5 p-10'>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
    </div>
  )
}

export default CartList