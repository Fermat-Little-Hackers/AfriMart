'use client'
// context/YourContext.js
import { createContext, useState, useContext } from 'react';

const YourContext = createContext();

export const YourContextProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(null);

  return (
    <YourContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </YourContext.Provider>
  );
};

export const useYourContext = () => useContext(YourContext);