import React, { useEffect } from 'react'
import useFetchURI from '../../../../hooks/useFetchURI'

interface imageprop {
    uri : string;
}
const UserWithPhotos : React.FC<imageprop> = ({uri}) => {
    const {data} = useFetchURI(uri)
    const trimmedUri = data?.image?.substring(7);
    
    return (
    <div className="rounded-full ring-1 ring-red-300 w-12 h-12 border-solid bg-white">
        <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt=""/>
    </div>

  )
}

export default UserWithPhotos