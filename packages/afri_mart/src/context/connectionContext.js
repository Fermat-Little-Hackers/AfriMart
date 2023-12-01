'use client'
import { createContext, useState, useContext } from 'react';


const ConnectionContext = createContext();
export const ConnectionContextProvider = ({ children })=>{
    const [ShareAddress, setShareAddress] = useState(null);

    return (
      <ConnectionContext.Provider value={{ ShareAddress, setShareAddress }}>
        {children}
      </ConnectionContext.Provider>
    );
}
export const useConnectionContext = () => useContext(ConnectionContext);
