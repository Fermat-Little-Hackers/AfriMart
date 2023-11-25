// ProductAmountButton.js
import React, { useState } from 'react';

const ProductAmountButton = () => {
  const [count, setCount] = useState(1);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const reduceCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex items-center">
      {/* Reduce button */}
      <button
        className="bg-gray-200 px-3 py-1 rounded-l cursor-pointer"
        onClick={reduceCount}
      >
        -
      </button>

      {/* Count display */}
      <div className="bg-gray-100 px-3 py-1">
        {count}
      </div>

      {/* Increase button */}
      <button
        className="bg-gray-200 px-3 py-1 rounded-r cursor-pointer"
        onClick={increaseCount}
      >
        +
      </button>
    </div>
  );
};

export default ProductAmountButton;
