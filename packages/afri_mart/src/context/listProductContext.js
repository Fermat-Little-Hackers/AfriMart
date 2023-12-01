'use client'
// context/YourContext.js
import { createContext, useState, useContext } from 'react';

const ListProductContext = createContext();

export const ListProductContextProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(null);

  return (
    <ListProductContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </ListProductContext.Provider>
  );
};

export const useListProductContext = () => useContext(ListProductContext);