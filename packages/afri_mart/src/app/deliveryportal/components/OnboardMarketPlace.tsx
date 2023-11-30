import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

const OnboardMarketPlace = () => {
  const [marketPlaceAddress, setMarketAddress] = useState("");

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketAddress(e.target.value);
  };

  const onboardMarketPlace: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setName(event.target.value);
    console.log('name changed');
    console.log(event.target.value);
}

const onSubmit: SubmitHandler<FormData> = (data) => {
  // Handle the form submission logic (e.g., send data to server)
  // setSubmittedData(data);
  console.log('submitted');
  // console.log(previewImage);
  // console.log(name);
};

const { register, handleSubmit, setValue, formState: { errors }  } = useForm<FormData>();

  return (
    <div className="">
    <h3 className="mb-7 text-xl md:text-2xl font-medium">Onboard Market Place</h3>
    <div className=" text-left">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Market place Address
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleNameChange}
                autoComplete="name"
                required
                className="block w-3/4 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[var(--terracota)] placeholder:text-gray-400 focus:ring-1  bg-transparent focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className='flex flex-row gap-5 '>
            <button
              type="submit"
              className="rounded-md bg-indigo-600  px-8 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Onboard
            </button>
          </div>
        </form>
    </div>
    </div>
  );
};

export default OnboardMarketPlace;
