import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

const RegisterBranchAdmins = () => {
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

  const handleCompanyId = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setCompanyId(Number(e.target.value));
  };

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
    <h3 className="mb-7 text-2xl">Register New Admins</h3>
    <div className="justify-start p-10 text-left border-2 border-black">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="companyId" className="block text-gray-600 text-sm font-semibold mb-2">
          Company ID
        </label>
        <input
          type="number"
          name="companyId"
          id="companyId"
          onChange={handleCompanyId}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Admin Address
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleNameChange}
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className='flex flex-row gap-5 items-center justify-center'>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
    </div>
    </div>
  );
};

export default RegisterBranchAdmins;
