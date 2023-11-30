import React from 'react'
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { useRegisteredContext } from '../../context/registeredContext';
import main from '../../../utils/upload.mjs'

interface FormData {
    profilePicture: FileList | null;
    // name: string;
    // state: string;
    // country: string;
  }


const ProfileForm: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex md:items-center justify-center bg-gray-700 bg-opacity-70">
    <div className="md:max-w-xl w-[80%] h-fit mt-[10vh] mx-auto md:mt-10 p-6 md:p-10 bg-gray-100 rounded-md shadow-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create profile to proceed
          </h2>
        </div>
        <div>
        {FormField()}
        </div>

      </div>
      </div>
  )
}


const FormField = () => {
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const { sharedState, setSharedState } = useRegisteredContext();
    // const [waitText, setWaitText] = useState(`Confirm you intend to make a purchase ${itemName} worth $${price} from AfriMart`);
    const [imageSrc, setImageSrc] = useState('/image/wait.svg');
    const [isDisabled, setIsDisabled] = useState(false);
    const [imageblob, setImageBlob] = useState<File | undefined >()

    const { register, handleSubmit, setValue, formState: { errors }  } = useForm<FormData>();

    const handleProcessPayment = () => {
        setIsDisabled(true);
        setImageSrc((prevSrc) => (prevSrc === '/image/wait.svg' ? '/image/loading.svg' : '/image/wait.svg'));
        // setWaitText( 'Processing transaction, please wait');
    };

    const handleCancelProfile = () => {
        setSharedState(false);
        setIsDisabled(false);
        setImageSrc((prevSrc) => (prevSrc === '/image/wait.svg' ? '/image/loading.svg' : '/image/wait.svg'));
        // setWaitText( 'Confirm you intend to make a purchase wort $650 from AfriMart');
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // Handle the form submission logic (e.g., send data to server)
        // setSubmittedData(data);
        let ipfsDetails = await main(imageblob,name,name)
        console.log('Returned ipfs hash after upload',ipfsDetails);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
        // Set the preview image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        setImageBlob(file)
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log('name changed');
        console.log(event.target.value);
    }

    return (
        <div className="mt-5 md:mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="profilePicture" className="block text-sm font-medium leading-6 text-gray-900">
              Profile Picture
            </label>
            <div className='flex flex-col md:flex-row'>
                  <div>
                      {previewImage && (
                          <Image
                          src={previewImage}
                          alt="Preview"
                          width={2}
                          height={2}
                          className="mt-2 w-16 h-16 object-cover md:mr-5 rounded-full border border-gray-300"
                          />
                      )}
                  </div>
                  <div className="flex items-center justify-center">
                      <input
                      id="profilePicture"
                      name="profilePicture"
                      type="file"
                      onChange={handleImageChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                  </div>
              </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleNameChange}
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className='flex flex-row gap-5 items-center justify-center'>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Profile
            </button>
              <button
                  type="button"
                  className="bg-gray-500 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleCancelProfile}
                  >
                  Cancel
              </button>
          </div>
        </form>
      </div>
    )
}

export default ProfileForm