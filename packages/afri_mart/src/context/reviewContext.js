'use client'
// context/YourContext.js
import { createContext, useState, useContext } from 'react';

const ReviewContext = createContext();

export const ReviewContextProvider = ({ children }) => {
  const [reviewState, setReviewState] = useState(0);

  return (
    <ReviewContext.Provider value={{ reviewState, setReviewState }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => useContext(ReviewContext);