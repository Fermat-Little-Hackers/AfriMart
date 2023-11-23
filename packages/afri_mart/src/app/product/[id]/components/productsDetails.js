import React from 'react'
import ProductAmountButton from './productButton'
import Stars from '../../../../components/market-place/stars'


const ProductsDetails = () => {
  return (
    <div className="flex flex-row gap-10 mx-20 my-20 h-[65vh]">
                <div className="flex flex-col w-[40%] gap-2">
                    <div className="border-2 border-black bg-gray-700 w-[20rem] h-[20rem]"></div>
                    <div></div>
                    <div className='flex flex-col gap-2'>
                        <div>
                            <Stars amount={2.5}/>
                        </div>
                        <p> Seller: Dorcas James</p>
                        <p> Seller Address: 0x0h7y34...7ys98s</p>
                    </div>
                </div>
                <div className="border-2 border-black h-[100%] w-[100%] p-10 flex flex-col justify-between">
                    <div className='flex flex-col gap-3'>
                        <p>DANSHIKI MARTERIAL</p>
                        <p>$50</p>
                        <ProductAmountButton />
                        <div className="flex flex-row gap-10">
                            <button
                                type="button"
                                className='bg-blue-500 text-white px-4 py-2 rounded-3xl'
                                onclick="startSearch()"
                            >
                                ADD TO CART
                            </button>
                            <button
                                type="button"
                                className=' bg-blue-500 text-white px-4 py-2 rounded-3xl'
                                onclick="startSearch()"
                            >
                                BUY NOW
                            </button>
                        </div>
                    </div>
                    <div className="border-2 border-black mr-10 w-[100%] h-[45%] p-4">
                        <p className='mb-3'>
                            DESCRIPTION
                        </p>
                        <p>
                            Anim ipsum adipisicing irure dolor pariatur veniam culpa quis labore deserunt nulla amet proident. Exercitation consectetur deserunt velit velit laboris ad. Ullamco labore veniam laborum mollit occaecat consequat ullamco consectetur. 
                        </p>
                    </div>
                </div>
            </div>
  )
}

export default ProductsDetails