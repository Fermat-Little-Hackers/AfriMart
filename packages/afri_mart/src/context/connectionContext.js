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



const AccountContext = createContext();
export const AccountContextProvider = ({ children })=>{
  const [ShareAccount, setShareAccount] = useState(null);

  return (
    <AccountContext.Provider value={{ ShareAccount, setShareAccount }}>
      {children}
    </AccountContext.Provider>
  );
}
export const useAccountContext = () => useContext(AccountContext);


const LoadingContext = createContext();
export const LoadingContextProvider = ({ children })=>{
  const [ShareLoad, setShareLoad] = useState(null);

  return (
    <LoadingContext.Provider value={{ ShareLoad, setShareLoad }}>
      {children}
    </LoadingContext.Provider>
  );
}
export const useLoadingContext = () => useContext(LoadingContext);

const RatingContext = createContext();
export const RatingContextProvider = ({ children })=>{
  const [ratingLoad, setRatingLoad] = useState(null);

  return (
    <RatingContext.Provider value={{ ratingLoad, setRatingLoad}}>
      {children}
    </RatingContext.Provider>
  );
}
export const useRatingContext = () => useContext(RatingContext);

