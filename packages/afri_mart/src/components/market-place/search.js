'use client'
import { FaShoppingCart, FaUser, FaBars, FaSearch } from 'react-icons/fa';
import Link from "next/link";


const startSearch = () => {
    
}

const Search = () => {
    return(
    <div>
        <div className='menuBar flex flex-row md:flex-row mx-5 md:mx-20 my-5 md:justify-between gap-2 md:gap-0'>
          <div className='flex items-center border-2 border-black w-full md:w-[30rem] h-10 p-5 md:p-5 pr-0 md:pl-5 md:pr-0 rounded-3xl'>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="..."
              className='outline-none focus:outline-none w-full md:w-[80%] mr-4 md:mr-6'
            />
            <button
              type="button"
              className=' bg-gray-600 text-white px-2 md:px-4 py-2 rounded-3xl flex items-center'
              onClick={startSearch}
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
          <div className="flex flex-row gap-2 md:gap-5 md:mt-0 md:pl-0">
            <Link href="/cart">
              <div className='border-solid border-2 border-black h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
                <FaShoppingCart />
              </div>
            </Link>
            <div className='border-solid border-2 border-black h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
              <FaUser />
            </div>
            {/* <div className='border-solid border-2 border-black h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
              <FaBars />
            </div> */}
          </div>
        </div>
        <hr></hr>
    </div>
    )
}

export default Search;