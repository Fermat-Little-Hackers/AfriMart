'use client'
// context/YourContext.js
import { createContext, useState, useContext } from 'react';

const RegisteredContext = createContext();

export const RegisteredContextProvider = ({ children }) => {
  const [profileState, setProfileState] = useState(null);

  return (
    <RegisteredContext.Provider value={{ profileState, setProfileState}}>
      {children}
    </RegisteredContext.Provider>
  );
};

export const useRegisteredContext = () => useContext(RegisteredContext);