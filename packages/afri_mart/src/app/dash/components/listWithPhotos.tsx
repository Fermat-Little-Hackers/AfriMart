import React from 'react'
import useFetchURI from '../../../../hooks/useFetchURI'

interface imageprop {
    uri : string;
}

const ListWithPhotos: React.FC<imageprop> = ({uri}) => {
    const {data} = useFetchURI(uri)
    const trimmedUri = data?.image?.substring(7);
  return (
    <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt="" className="h-[80px] p-4 smx:h-[100%] w-[20%] smx:w-[30%] bg-gray-700" />

  )
}

export default ListWithPhotos