import React, { useEffect, useState } from "react";

const RegisterDirectors = () => {
  const [directorAddress, setDirectorAddress] = useState("");

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirectorAddress(e.target.value);
  };

  const onboardDirector: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <div className="">
    <h3 className="mb-7 text-2xl">Register Directors</h3>
    <div className="justify-start p-10 text-left border-2 border-black">
      <form className="space-y-4" onSubmit={onboardDirector}>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Director Address
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleAddress}
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

export default RegisterDirectors;
