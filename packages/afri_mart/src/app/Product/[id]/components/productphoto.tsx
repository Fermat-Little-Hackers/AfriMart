import React from 'react'
import useFetchURI from '../../../../../hooks/useFetchURI'


interface productprops {
    uri : string
}

const Productphoto : React.FC<productprops> = ({uri}) => {
    const {data} = useFetchURI(uri)
    console.log(data);
    const trimmedUri = data?.image?.substring(7);
    console.log(trimmedUri);
    return (
    <div className="md:w-[20rem] h-[20rem]">
               <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt="" className='w-full h-full object-cover' />
    </div>

  )
}

export default Productphoto