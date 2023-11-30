import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  profilePicture: FileList | null;
  // name: string;
  // state: string;
  // country: string;
}

const DeployBranch = () => {
  const [OrderId, setOrderId] = useState<any>();
  const [Name, setName] = useState<any>();
  const [Address, setAddress] = useState("");
  const [trackMode, settrackMode] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { register, handleSubmit, setValue, formState: { errors }  } = useForm<FormData>();


  const handleOrderId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handletrackMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    settrackMode(e.target.value);
  };


  const createBranch: SubmitHandler<FormData> = () => {
   console.log('submitted......')
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

    // Update form value for validation
    setValue('profilePicture', event.target.files);
    }
};

  return (
    <div className="">
      <h3 className="mb-5 md:mb-7 text-xl md:text-2xl">Register Shipment</h3>
      <div className="justify-start text-left ">
        <form
          onSubmit={handleSubmit(createBranch)}
          className="w-3/4 "
        >
          <div className="mb-4">
            <label
              htmlFor="OrderId"
              className="block  text-gray-600 text-sm font-semibold mb-2"
            >
              Order ID
            </label>
            <input
              type="number"
              name="OrderId"
              id="OrderId"
              value={OrderId}
              onChange={handleOrderId}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Name"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              NAME
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              value={Name}
              onChange={handleName}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
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
                className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
                      />
                  </div>
              </div>
          <div className="mb-4">
            <label
              htmlFor="Address"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              name="Address"
              id="Address"
              value={Address}
              onChange={handleAddress}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="trackMode"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Tracking Code
            </label>
            <input
              type="text"
              name="trackMode"
              id="trackMode"
              value={trackMode}
              onChange={handletrackMode}
              className="w-full p-2 bg-transparent ring-1 ring-[var(--terracota)]  rounded focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-700"
            >
              Register Shipment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeployBranch;
