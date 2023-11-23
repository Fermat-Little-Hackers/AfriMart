import React from 'react'
import CartList from './cartList'
import CartPrice from './cartPrice'

const CartContent = () => {
  return (
    <div className='mx-20 h-fit pt-10 flex flex-col gap-7 mt-10'>
    <p> CART</p>
    <div className='flex flex-row gap-10'>
        <CartList />
        <CartPrice />
    </div>   
</div>
  )
}

export default CartContent