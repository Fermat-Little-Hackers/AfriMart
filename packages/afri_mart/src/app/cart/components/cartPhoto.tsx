import React from 'react'
import useFetchURI from '../../../../hooks/useFetchURI'


interface imageprop {
    uri : string;
}
const CartPhoto : React.FC<imageprop> = ({uri}) => {
    const {data} = useFetchURI(uri)
    const trimmedUri = data?.image?.substring(7);
    return (
        <div className='border-2 bg-[var(--sand)] border-black w-[4.5rem] md:h-[5rem]'>
               <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt="" className='w-full h-full object-cover' />
        </div>
  )
}

export default CartPhoto