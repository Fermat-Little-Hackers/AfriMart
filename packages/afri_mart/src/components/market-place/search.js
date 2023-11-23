'use client'
import { FaShoppingCart, FaUser, FaBars, FaSearch } from 'react-icons/fa';
import Link from "next/link";


const startSearch = () => {
    
}

const Search = () => {
    return(
        <div>
            <div>
                <div className='menuBar flex flex-row mx-20 my-5 justify-between'>
                    <div className='flex items-center border-2 border-black w-[30rem] h-10 p-5 pr-0 rounded-3xl'>
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="..."
                            className=' outline-none focus:outline-none w-[80%]'
                            
                        />
                        <button
                            type="button"
                            className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-3xl flex items-center'
                            onClick={startSearch}
                            >
                            <FaSearch className="mr-2" /> Search
                        </button>
                    </div>
                    <div className="flex flex-row gap-5">
                        <Link href="/cart">
                            <div className='border-solid border-2 border-black h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
                                <FaShoppingCart />
                            </div>
                        </Link>
                        <div className='border-solid border-2 border-black h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
                            <FaUser />
                        </div>
                        <div className='border-solid border-2 border-black h-[2.7rem] rounded-3xl w-[2.7rem] flex items-center justify-center'>
                            <FaBars />
                        </div>
                    </div>
                </div>
                <hr></hr>
            </div>
        </div>
    )
}

export default Search;