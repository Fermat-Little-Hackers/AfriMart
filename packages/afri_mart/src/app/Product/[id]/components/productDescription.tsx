import React from 'react'
import useFetchURI from '../../../../../hooks/useFetchURI'


interface productprops {
    uri : string
}

const ProductDescription : React.FC<productprops> = ({uri}) => {
    const {data} = useFetchURI(uri)
    const name = data?.name;
    const description = data?.description;
    return (
        <p>{description ? description : "loading..."}</p>
    )
}

export default ProductDescription