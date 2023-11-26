import React, { useState } from 'react'

import { FaShoppingCart, FaUser, FaBars, FaSearch } from 'react-icons/fa';




const TrackShipment = () => {
    const [trackingNumber, setTrackingNumber] = useState();

    const onboardDirector: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    };

    const manageTrackingNumber = () => {
    
    };

    const startSearch = () => {
    
    };
    

  return (
    <div className="">
    <h3 className="mb-7 text-2xl">Track Shipment</h3>
    <div className="justify-start p-10 text-left border-2 border-black">
      <div className='flex items-center border-2 border-black w-full md:w-[30rem] h-10 p-5 md:p-5 pr-0 md:pl-5 md:pr-0 rounded-3xl'>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Tracking Number"
              onChange={manageTrackingNumber}
              className='outline-none focus:outline-none w-full md:w-[100%] mr-4 md:mr-6'
            />
            <button
              type="button"
              className=' bg-gray-600 text-white px-2 md:px-4 py-2 rounded-3xl flex items-center'
              onClick={startSearch}
            >
              <FaSearch className="mr-2" /> Track
            </button>
          </div>

          <div className='flex flex-row h-[15rem] gap-5 items-center justify-center border-2 border-black mt-7'>

          </div>
    </div>
    </div>
  )
}

export default TrackShipment