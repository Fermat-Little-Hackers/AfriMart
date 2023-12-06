import React from 'react'
import useFetchURI from '../../../../../hooks/useFetchURI'


interface productprops {
    uri : string
}

const ProductName : React.FC<productprops> = ({uri}) => {
    const {data} = useFetchURI(uri)
    const name = data?.name;
    const description = data?.description;
    return (
        <h1 className='text-3xl font-semibold'>{name ? name : "loading..."}</h1>
    )
}

export default ProductName