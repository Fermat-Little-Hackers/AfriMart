import React from 'react'
import useFetchURI from '../../../hooks/useFetchURI';


interface productprops {
    uri : string
}

const ProductName : React.FC<productprops> = ({uri}) => {
    const {data} = useFetchURI(uri)
    const name = data?.name;
    const description = data?.description;
    return (
        <p className=" font-bold text-[15px] ">{name? (name.length > 12 ? `${name.slice(0, 10)}...` : name) : 'loading...'}</p>
    )
}

export default ProductName