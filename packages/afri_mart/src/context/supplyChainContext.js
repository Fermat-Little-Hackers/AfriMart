'use client'
// context/YourContext.js
import { createContext, useState, useContext } from 'react';

const SupplyChainContext = createContext();

export const SupplyChainContextProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(null);

  return (
    <SupplyChainContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </SupplyChainContext.Provider>
  );
};

export const useSupplyChainContext = () => useContext(SupplyChainContext);