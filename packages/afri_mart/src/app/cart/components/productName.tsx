import React from 'react'
import useFetchURI from '../../../../hooks/useFetchURI';


interface productprops {
    uri : string
}

const ProductName : React.FC<productprops> = ({uri}) => {
    const {data} = useFetchURI(uri)
    const name = data?.name;
    const description = data?.description;
    return (
        <div><p className="md:text-xl text-sm font-bold">{name ? name : " loading.... "}</p></div>
    )
}

export default ProductName