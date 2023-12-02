// ProductRatingForm.tsx
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import React, { useEffect, useState } from 'react';
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import reviewContractAbi from '../../../ABI/rattingsContract.json'
import { MarketPlaceAddr, RattingAddr } from '../../../components/addresses';
import { useRatingContext } from '@/context/connectionContext';

interface MyProps {
  itemId: number;
}


const ProductRatingForm: React.FC<MyProps> = ({ itemId }) => {
  console.log(`product rating Id:`, itemId);
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState('');
  const { ratingLoad, setRatingLoad} = useRatingContext();


  useEffect(() => {
    const connectToStarknet = async() => {
      const connection = await connect({ modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" })
      if(connection && connection.isConnected) {
        setConnection(connection)
        setAccount(connection.account)
        setAddress(connection.selectedAddress)
      }
    }
    connectToStarknet()
  }, [itemId])  


  const reviewProductFnc = async() => {
    const provider = new Provider({
      rpc: {
        // nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
        nodeUrl: "https://rpc.starknet-testnet.lava.build"
      }
    }) 
    try {
        let halfLength = Math.floor(review.length / 2)
        const contract = new Contract(reviewContractAbi, RattingAddr(), account)
        const profileSetDetails = await contract.review_product(itemId, rating, review.substring(0, halfLength), review.substring(halfLength));
    } catch (e:any) {
      console.log(e);
      // setProfileState(true)
    }
  }


  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    reviewProductFnc();
    // Add your logic here to submit the review and rating
    // console.log('Review:', review);
    // console.log('Rating:', rating);
    setRatingLoad(false);

  };

  const cancelReview = () => {
    setRatingLoad(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex md:items-center justify-center bg-gray-700 bg-opacity-70">
    <div className="max-w-md w-[90vw] h-fit mt-[16vh] md:w-[60vw] mx-auto md:mt-8 p-5 md:p-10 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Whats your review on this product ?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium text-gray-600">
            Review (max 60 characters):
          </label>
          <textarea
            id="review"
            value={review}
            onChange={handleReviewChange}
            maxLength={60}
            rows={5} // Adjust the number of rows as needed
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
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
          className="bg-[var(--afroroasters-brown)] text-white py-2 px-4 rounded-md hover:bg-[rgb(181, 111, 94)] focus:outline-none md:mt-7 mr-7"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-[rgb(181, 111, 94)] focus:outline-none md:mt-7"
          onClick={cancelReview}
        >
          Cancel
        </button>
      </form>
    </div>
    </div>
  );
};

export default ProductRatingForm;
