import React from 'react'
import useFetchURI from '../../../hooks/useFetchURI'


interface trendprops {
    uri : string
}

const TrendingPhoto : React.FC<trendprops> = ({uri}) => {
    const {data} = useFetchURI(uri)
    const trimmedUri = data?.image?.substring(7);
  
    return (
    <div className="border-2 border-black h-[6rem] md:h-[60%] w-[100%]">
               <img src={`https://ipfs.io/ipfs/${trimmedUri}`} alt="" />

    </div>

  )
}

export default TrendingPhoto