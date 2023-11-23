import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import { useYourContext } from '../../context/YourContext';


function ConfirmPurchasePopUp() {
    const { sharedState, setSharedState } = useYourContext();
    const [imageSrc, setImageSrc] = useState('/image/wait.svg');
    const [waitText, setWaitText] = useState('Confirm you intend to make a purchase wort $650 from AfriMart');
    const [isDisabled, setIsDisabled] = useState(false);

    const handleProcessPayment = () => {
        setIsDisabled(true);
        setImageSrc((prevSrc) => (prevSrc === '/image/wait.svg' ? '/image/loading.svg' : '/image/wait.svg'));
        setWaitText( 'Processing transaction, please wait');
    };

    const handleCancelPayment = () => {
        setIsDisabled(false);
        setImageSrc((prevSrc) => (prevSrc === '/image/wait.svg' ? '/image/loading.svg' : '/image/wait.svg'));
        setWaitText( 'Confirm you intend to make a purchase wort $650 from AfriMart');
        setSharedState(false);
    }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-70">
    <div className="bg-white p-10 rounded-md text-center w-[45%] h-fit">
        <div className='w-[100%] h-fit flex items-center justify-center mb-5'> 
            <div className=' w-[20%] h-[40%] '>
            <Image
                src={imageSrc} // Path to your image from the public directory
                alt="Example Image"
                className="w-full max-w-md" // Adjust the styling as needed
                width={3}
                height={3}
                />
            </div>
        </div>
        <p className='text-lg mb-5'>{waitText}</p>
        <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleProcessPayment}
            disabled={isDisabled}
            >
            Confirm
        </button>
        <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={handleCancelPayment}
            >
            Cancel
        </button>
    </div>
    </div>
  )
}

export default ConfirmPurchasePopUp