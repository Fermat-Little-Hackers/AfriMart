"use client";
import React, { useState } from "react";

const UserDetails = () => {
  const [profileOwner, setProfileOwner] = useState("");

  return (
    <div className="flex mt-10">
      <div className="rounded-full w-20  h-20 border-solid border-2 border-black mr-4"></div>
      <div className=" float-right">
        <div>Kehinde Paul</div>
        <div>0x684864bhfg747449jtk</div>
      </div>
    </div>
  );
};

export default UserDetails;
