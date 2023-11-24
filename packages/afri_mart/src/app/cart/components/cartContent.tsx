import React from 'react'
import CartList from './cartList'
import CartPrice from './cartPrice'

const CartContent = () => {
  return (
    <div className='mx-5 md:mx-20 h-fit md:pt-10 flex flex-col gap-4 md:gap-7 mt-10'>
    <p> CART</p>
    <div className='flex flex-col md:flex-row gap-10'>
        <CartList />
        <CartPrice />
    </div>   
</div>
  )
}

export default CartContent