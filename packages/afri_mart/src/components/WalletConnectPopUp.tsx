import React from 'react'
import Image from 'next/image';
import { useConnect } from '@starknet-react/core';
import { Button } from './ui/Button';
import { useYourContext } from '@/context/YourContext';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';


const WalletsToConnect: React.FC = () => {
    const {wantToConnect, setWantToConnect} = useYourContext();

    return (
        <div className="fixed top-0 left-0 w-full h-full flex md:items-center justify-center bg-gray-700 bg-opacity-70">
            <div className="md:max-w-xl w-[80%] h-fit mt-[10vh] mx-auto md:mt-10 p-6 md:p-10 bg-gray-100 rounded-md shadow-md">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-row gap-4">
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Select Prefered Wallet
                    </h2>
                    <Button type="submit" className=' bg-gray-100 w-[2rem] h-[2rem] rounded-xl' onClick={() => setWantToConnect(!wantToConnect)}><FaTimes /></Button>
                </div>
                <div>
                    {AvailableWallets()}
                </div>

            </div>
        </div>
    )
}





const AvailableWallets = () => {
    const { connectors, connect } = useConnect();

    return (
        <div className="mt-5 md:mt-10 sm:mx-auto sm:w-full sm:max-w-sm items-center">
            <div className='flex flex-col gap-3'>
                {
                    connectors.map((connector: any) => {
                        return (
                            <div key={connector.id}>
                            <Button
                                key={connector.id}
                                onClick={() => connect({ connector })}
                                className="gap-x-2 mr-2"
                            >
                                {`Connect with ${connector.id}`}
                            </Button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default WalletsToConnect