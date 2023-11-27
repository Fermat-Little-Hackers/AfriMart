'use client'
// context/YourContext.js
import { createContext, useState, useContext } from 'react';

const YourContext = createContext();

export const YourContextProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState(null);
  const [wantToConnect, setWantToConnect] = useState();

  return (
    <YourContext.Provider value={{ sharedState, setSharedState, wantToConnect, setWantToConnect }}>
      {children}
    </YourContext.Provider>
  );
};

export const useYourContext = () => useContext(YourContext);