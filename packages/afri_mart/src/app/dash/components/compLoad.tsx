import React from 'react'
import Image from 'next/image';


const CompLoad = () => {
  return (
    <div className='h-[100%] w-[100%] text-center items-center flex'>
                <Image src={'/image/spin.svg'} alt="Example Image" className="w-[3rem] md:w-[3rem] mx-auto" width={1} height={1} />
            </div>
  )
}

export default CompLoad