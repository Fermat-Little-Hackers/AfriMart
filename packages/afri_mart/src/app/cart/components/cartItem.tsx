import marketPlaceAbi from '@/ABI/marketPlace';
import { MarketPlaceAddr } from '@/components/addresses';
import React, { useEffect, useState } from 'react'
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import marketplaceAbi from '@/ABI/marketPlace';
import CartPhoto from './cartPhoto';
import { useAppContext } from '@/context/provider'
import ProductName from './productName';


interface MyProps {
  ProductId: number;
  amount: number;
}

const CartItem: React.FC<MyProps> =  ({ProductId, amount}) => {
  const [price, setPrice] = useState<Number>();
  const [imgUri, setImgUri] = useState<any>();
  const [name, setName] = useState<any>();
  const {readContract} = useAppContext();

  const getProduct = async() => {
      try {
      const details = await readContract.getProductDetails(ProductId);
      let eth = 1000000000000000000;
        setName(hexToReadableText(details.name.toString(16)))
        setImgUri(hexToReadableText(details.imageUri1.toString(16)) + hexToReadableText(details.imageUri2.toString(16)));
        setPrice(Number(details.price) / eth);
      } catch (error : any) {      
        console.log(error.message);
      }
}

function hexToReadableText(hexString : any) {
  const bytes = Buffer.from(hexString, 'hex'); 
  const text = new TextDecoder('utf-8').decode(bytes);
  return text;
}

useEffect(() => {
  getProduct();
}, [ProductId])


function formatDecimalTo5Places(inputNumber: any) {
  // Convert the input number to a fixed string with 5 decimal places
  const formattedNumber = Number(inputNumber).toFixed(5);

  // Convert the formatted string back to a number if needed
  const result = Number(formattedNumber);

  return result;
}


  return (
      <div className='flex flex-row bg-[var(--charcoal)] rounded-xl text-[var(--sand)] justify-between w-[100%] border-2 border-black p-4 gap-2 md:gap-0'>
        {/* <div className='border-2 bg-[var(--sand)] border-black w-[4.5rem] md:h-[5rem]'>

        </div> */}
        <CartPhoto uri={imgUri}/>
        <div className='flex flex-col w-[35%] md:w-[50%] gap-1'>
            <ProductName uri={imgUri}/>
            <div> <p className='text-sm'>Qty: {amount ? Number(amount) : '0'}</p> </div>
        </div>
        <div className="flex items-center justify-center">
            <p className="md:text-xl text-sm">{price ? formatDecimalTo5Places((Number(price)) * Number(amount)) : '0.00'} Eth</p>
        </div>

        <div className="flex items-center justify-center">
            <button
                type="button"
                className=' ring-2 ring-[var(--kohl-pink)] bg-[var(--rouge)]  text-white px-2 md:px-5 md:py-1 rounded-3xl '
            >
                Delete
            </button>
        </div>
    </div>
  )
}

export default CartItem