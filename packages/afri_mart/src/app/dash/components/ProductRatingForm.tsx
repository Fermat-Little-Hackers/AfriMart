// ProductRatingForm.tsx

import React, { useState } from 'react';

const ProductRatingForm: React.FC = () => {
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Add your logic here to submit the review and rating
    console.log('Review:', review);
    console.log('Rating:', rating);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Rate Your Purchased Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-gray-600">
            Review (max 60 characters):
          </label>
          <input
            type="text"
            id="review"
            value={review}
            onChange={handleReviewChange}
            maxLength={60}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[var(--afroroasters-brown)]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Rating:</label>
          <div>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => handleRatingChange(value)}
                  className="form-radio text-[var(--afroroasters-brown)] focus:outline-none focus:border-[var(--afroroasters-brown)] focus:shadow-outline-blue"
                />
                <span className="ml-2">{value}⭐</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-[var(--afroroasters-brown)] text-white py-2 px-4 rounded-md hover:bg-[rgb(181, 111, 94)] focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductRatingForm;
