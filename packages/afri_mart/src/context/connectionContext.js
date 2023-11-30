'use client'
import { createContext, useState } from 'react';


const ConnectionContext = createContext();
export const ConnectionContextProvider = ({ children })=>{
    const [ShareConnection, setShareConnection] = useState(null);

    return (
      <ConnectionContext.Provider value={{ ShareConnection, setShareConnection }}>
        {children}
      </ConnectionContext.Provider>
    );
}
