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
        <p className="smx:text-[15px]">{name} </p>
    )
}

export default ProductName