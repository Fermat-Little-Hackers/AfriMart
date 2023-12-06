import React from 'react'
import {useState} from 'react'
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'

// import ProductAmountButton from './productButton'
import Stars from '../../../../components/market-place/stars'
import { useYourContext } from '../../../../context/YourContext';
import ConfirmPurchasePopUp from '@/components/market-place/confirmPurchasePopUp';
import { useAccount, useContractRead } from "@starknet-react/core";
import { MarketPlaceAddr, RattingAddr } from '../../../../components/addresses';
import { useEffect } from 'react';
import marketplaceAbi from '../../../../ABI/marketPlace'
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import dummy from '../../../../ABI/dummy.json'
import Image from 'next/image';
import { CairoOption, CairoCustomEnum, CairoEnumRaw } from "starknet";
import Productphoto from './productphoto';
import rattingsContract from '@/ABI/rattingsContract.json';
import { useRegisteredContext } from '@/context/registeredContext';
import ProfileForm from '@/components/market-place/createProfile';
import { useLoadingContext } from '@/context/connectionContext';
import { useAppContext } from '@/context/provider'
import useFetchURI from '../../../../../hooks/useFetchURI'
import ProductName from './productName';
import ProductDescription from './productDescription';


type cartegory = {
  Agriculture: any,
  TextileAndClothings: any,
  Accesories: any,
  ToolsAndEquipments: any,
  DigitalArts: any,
  PhysicalArtsNDSculptures: any,
}

interface MyProps {
    itemId: number;
  }

const ProductsDetails: React.FC<MyProps> = ({ itemId }) => {
    const { sharedState, setSharedState} = useYourContext();
    const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
    const [count, setCount] = useState(1);
    const [rating, setRating] = useState<number>( );
    const [name, setName] = useState<any>();
    const [seller, setSeller] = useState<any>();
    const [sellerName, setSellerName] = useState<any>();
    const [description, setDescription] = useState<any>();
    const [price, setPrice] = useState<any>();
    const [imgUri, setImgUri] = useState<any>();
    // const [imgUri2, setImgUri2] = useState<any>();
    const [addingCart, setAddingCart] = useState<boolean>(false);
    const { profileState, setProfileState } = useRegisteredContext();
    const [isCreated, setIsCreated] = useState<boolean>(false);
    const {ShareLoad, setShareLoad} = useLoadingContext();
    const {readContract, readReviewContract, contract, address} = useAppContext();





    const getProductReview = async() => {
        try {
            const details = await readReviewContract.getProductRatting(itemId);
            setRating(Number(details));
          // setProducts(details);
        } catch (error : any) {      
          console.log(error.message);
        }
    }



    const handlePurchaseClick = async() => {
      try {
      const profileSetDetails = await readContract.getUserProfile(address);
      // const profileSetDetails: any = await contract.call("getUserProfile", [connection&&connection.selectedAddress]);
      console.log(`details check:`, profileSetDetails.isCreated)
      console.log(`address check:`, connection&&connection.selectedAddress)
      setIsCreated(profileSetDetails.isCreated);
      !profileSetDetails.isCreated ? setProfileState(true) : setSharedState(true);
      } catch (e:any) {
        console.log(e);
        setProfileState(true)
      }

    };
    

    const getUserProfile = async(user: any) => {
          try {
            const details = await readContract.getUserProfile(user);
            // let eth = 1000000000000000000;
            // console.log(details);
            setSellerName(hexToReadableText(details.name.toString(16)));

            // console.log(`checksss: ${hexToReadableText(details.name.toString(16))}`);
          const profileSetDetails = await contract.getUserProfile(address);
          setIsCreated(profileSetDetails.isCreated);
          

          } catch(error: any) {
            console.log(error.message);
          }
    }


    const checkUserProfile = async() => {
        try {
        const profileSetDetails = await readContract.getUserProfile(address);
        console.log(`details check:`, profileSetDetails.isCreated)
        setIsCreated(profileSetDetails.isCreated);
        } catch(error: any) {
          console.log(error.message);
        }
  }
  checkUserProfile()


    const getProduct = async() => {
          try {
          const details = await readContract.getProductDetails(itemId);
          // console.log(details);
          let eth = 1000000000000000000;
            // setName(hexToReadableText(details.name.toString(16)))
            setImgUri(hexToReadableText(details.imageUri1.toString(16)) + hexToReadableText(details.imageUri2.toString(16)));            
            setPrice(Number(BigInt(details.price)) / eth);
            let cart:CairoEnumRaw = details.cartegory;
            setSeller(`0x${details.seller.toString(16)}`);
            // setDescription(hexToReadableText(details.description.toString(16)));
            getUserProfile(`0x${details.seller.toString(16)}`);
          } catch (error : any) {      
            console.log(error.message);
          }
    }


    useEffect(() => {
      getProduct();
      getProductReview();
    }, [])
    
    useEffect(() => {
      setShareLoad(false)
    }, [sellerName])
    

    // const intervalId = setInterval(getProduct, 7000);
      
      function hexToReadableText(hexString : any) {
        const bytes = Buffer.from(hexString, 'hex'); 
        const text = new TextDecoder('utf-8').decode(bytes);
        return text;
      }
    
    
    const ProductAmountButton = () => {
      
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

      const addToCartFnc = async() => {
        try {
        const profileSetDetails = await readContract.getUserProfile(address.toString());
        setIsCreated(profileSetDetails.isCreated);
        !profileSetDetails.isCreated ? setProfileState(true) : addToCart();
        } catch (e:any) {
          console.log(e);
          setProfileState(true)
        }
      }


      const addToCart = async() => {
        const provider = new Provider({
          rpc: {
            nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
          }
        })  
        try{
          const myCall = contract.populate("addItemToCart", [itemId, count]);
          const res = await contract.addItemToCart(myCall.calldata);
          deception();
          await provider.waitForTransaction(res.transaction_hash);
          } catch (error : any) {      
            console.log(error.message);
          }
    }

    const deception = () => {
        setAddingCart(true);
    setTimeout(() => {
        setAddingCart(false);
        // console.log('check222');
      }, 7000);
    }

    // const {data} = useFetchURI(imgUri);
    // setName(data&&data.name);
    // setDescription(data&&data.description);

      

  return (
    <div className="flex flex-col md:flex-row md:gap-32 md:mx-20 my-5 md:my-20 md:h-[65vh] p-5 md:p-0">
        <div className="flex flex-col md:w-[40%] gap-4">
            {/* <div className=" bg-[var(--afroroasters-brown)] md:w-[20rem] h-[20rem]"></div> */}
            <Productphoto uri={imgUri} />
            <div className='flex flex-col gap-2'>
                <div>
                    <Stars amount={rating ? rating : 0}/>
                </div>
                <p> Seller: {sellerName ? sellerName : 'loading....'}</p>
            </div>
        </div>

        <div className=" h-fit w-[100%] flex flex-col justify-between mt-5 md:mt-0 gap-4">
            <div className='flex flex-col gap-4 md:p-0'>
              <ProductName uri={imgUri} />
            <div className="mr-10 w-[100%] h-fit md:h-[45%]  md:mt-5">
              <ProductDescription uri={imgUri} />
            </div>
                <p>{price ? price : '0.00'} Eth</p>
                <ProductAmountButton />
                <div className="flex flex-row gap-5 md:gap-10">
                    {addingCart ? 
                      <button
                        type="button"
                        className='bg-[var(--afroroasters-brown)] text-white px-4 py-2 rounded-3xl w-[8rem] md:w-[8rem] justify-center items-center flex'
                      >
                       <Image src={'/image/loading.svg'} alt="Example Image" className="w-[1.5rem] md:w-[1.5rem]" width={1} height={1} />
                      </button>
                      :
                      <button
                      type="button"
                      className='bg-[var(--afroroasters-brown)] text-white px-4 py-2 rounded-3xl w-[8rem] md:w-[8rem] justify-center items-center flex'
                      onClick={addToCartFnc}
                      disabled={addingCart}
                    >
                    <p className='text-sm'>ADD TO CART</p>
                    </button>
                    }
                    <button
                        type="button"
                        className=' bg-[var(--afroroasters-brown)] text-white px-4 py-2 rounded-3xl w-[8rem] md:w-[8rem]'
                        onClick={handlePurchaseClick}
                    >
                        <p className='text-sm'>BUY NOW</p>
                    </button>
                </div>
            </div>
            
        </div>
        {/* Popup */}
        {sharedState && (
            <ConfirmPurchasePopUp itemName={` of ${name}`} price={price} id={itemId} amount={count} isCart={false} />
        )}

        {profileState && ( <ProfileForm /> )}

    </div>
  )
}

export default ProductsDetails