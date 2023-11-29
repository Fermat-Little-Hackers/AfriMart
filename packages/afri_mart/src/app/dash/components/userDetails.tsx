"use client";
import React, { useState } from "react";

const UserDetails = () => {
  const [profileOwner, setProfileOwner] = useState("");

  return (
    <div className="flex shadow-lg rounded-lg ring-1 ring-red-100  w-[400px] smx:w-[100%] smx:mx-auto p-4 gap-4">
      <div className="rounded-full ring-1 ring-red-300 w-12 h-12 border-solid bg-white"></div>
      <div className=" float-right">
        <div className="font-bold text-lg">Kehinde Paul</div>
        <div>0x684864bhfg747449jk</div>
      </div>
    </div>
  );
};

export default UserDetails;
