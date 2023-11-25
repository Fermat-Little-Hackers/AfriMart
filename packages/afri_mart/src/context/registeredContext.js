'use client'
// context/YourContext.js
import { createContext, useState, useContext } from 'react';

const RegisteredContext = createContext();

export const RegisteredContextProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(null);

  return (
    <RegisteredContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </RegisteredContext.Provider>
  );
};

export const useRegisteredContext = () => useContext(RegisteredContext);