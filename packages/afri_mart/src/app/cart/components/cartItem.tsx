import React from 'react'

const CartItem = () => {
  return (
    <div className='flex flex-row justify-between w-[100%] border-2 border-black p-2 gap-2 md:gap-0'>
        <div className='border-2 bg-gray-700 border-black w-[3rem] md:h-[3.5rem]'>

        </div>
        <div className='flex flex-col w-[35%] md:w-[50%] gap-1'>
            <div><p className="md:text-xl text-sm">ASHOKE MARTERIAL</p></div>
            <div> <p className='text-sm'>Qty: 2</p> </div>
        </div>
        <div className="flex items-center justify-center">
            <p className="md:text-xl text-sm">$150</p>
        </div>

        <div className="flex items-center justify-center">
            <button
                type="button"
                className=' border-2 border-black text-black px-2 md:px-5 md:py-1 rounded-3xl '
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default CartItem