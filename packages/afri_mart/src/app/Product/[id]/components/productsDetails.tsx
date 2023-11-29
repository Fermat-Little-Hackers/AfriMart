import React from 'react'
import {useState} from 'react'
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'

// import ProductAmountButton from './productButton'
import Stars from '../../../../components/market-place/stars'
import { useYourContext } from '../../../../context/YourContext';
import ConfirmPurchasePopUp from '@/components/market-place/confirmPurchasePopUp';
import { useAccount, useContractRead } from "@starknet-react/core";
import { MarketPlaceAddr } from '../../../../components/addresses';
import { useEffect } from 'react';
import marketplaceAbi from '../../../../ABI/marketPlace'
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import dummy from '../../../../ABI/dummy.json'
import Image from 'next/image';
import { CairoOption, CairoCustomEnum, CairoEnumRaw } from "starknet";

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

const ProductsDetails : React.FC<MyProps> = ({ itemId }) => {
    const { sharedState, setSharedState} = useYourContext();
    const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
    const [account, setAccount] = useState();
    const [address, setAddress] = useState('');
    const [count, setCount] = useState(1);
    const [name, setName] = useState<any>();
    const [seller, setSeller] = useState<any>();
    const [sellerName, setSellerName] = useState<any>();
    const [description, setDescription] = useState<any>();
    const [price, setPrice] = useState<any>();
    const [imgUri, setImgUri] = useState<any>();
    const [addingCart, setAddingCart] = useState<boolean>(false);


    const handlePurchaseClick = () => {
        setSharedState(true);
    };

    const getUserProfile = async(user: any) => {
        const provider = new Provider({
            rpc: {
              nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
            }
          })
          try {
            const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider)
            const details = await contract.getUserProfile(user);
            // let eth = 1000000000000000000;
            // console.log(details);
            setSellerName(hexToReadableText(details.name.toString(16)));
            // console.log(`checksss: ${hexToReadableText(details.name.toString(16))}`);

          } catch(error: any) {
            console.log(error.message);
          }
    }


    const getProduct = async() => {
        const provider = new Provider({
          rpc: {
            nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
          }
        })
          try {
          const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider)
          const details = await contract.getProductDetails(itemId);
          let eth = 1000000000000000000;
            setName(hexToReadableText(details.name.toString(16)))
            setImgUri(details.imageUri.toString(16));
            setPrice(Number(BigInt(details.price)) / eth);
            let cart:CairoEnumRaw = details.cartegory;
            setSeller(`0x${details.seller.toString(16)}`);
            setDescription(hexToReadableText(details.description.toString(16)));
            getUserProfile(`0x${details.seller.toString(16)}`);
          } catch (error : any) {      
            console.log(error.message);
          }
    }

    const intervalId = setInterval(getProduct, 2000);
      
      function hexToReadableText(hexString : any) {
        const bytes = Buffer.from(hexString, 'hex'); 
        const text = new TextDecoder('utf-8').decode(bytes);
        return text;
      }
    
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


      const addToCart = async() => {
        const provider = new Provider({
          rpc: {
            nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
          }
        })
          try{
          const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), account)
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
      

  return (
    <div className="flex flex-col md:flex-row md:gap-10 md:mx-20 my-5 md:my-20 md:h-[65vh] p-5 md:p-0">
        <div className="flex flex-col md:w-[40%] gap-2">
            <div className="border-2 border-black bg-gray-700 md:w-[20rem] h-[20rem]"></div>
            <div className='flex flex-col gap-2'>
                <div>
                    <Stars amount={2.5}/>
                </div>
                <p> Seller: {sellerName ? sellerName : 'loading....'}</p>
            </div>
        </div>

        <div className="border-2 border-black h-fit w-[100%] md:p-10 flex flex-col justify-between mt-5 md:mt-0">
            <div className='flex flex-col gap-3 p-5 md:p-0'>
                <p>{name ? name : "loading..."}</p>
                <p>{price ? price : '0.00'} Eth</p>
                <ProductAmountButton />
                <div className="flex flex-row gap-5 md:gap-10">
                    {addingCart ? 
                      <button
                        type="button"
                        className='bg-blue-500 text-white px-4 py-2 rounded-3xl w-[8rem] md:w-[8rem] justify-center items-center flex'
                      >
                       <Image src={'/image/loading.svg'} alt="Example Image" className="w-[1.5rem] md:w-[1.5rem]" width={1} height={1} />
                      </button>
                      :
                      <button
                      type="button"
                      className='bg-blue-500 text-white px-4 py-2 rounded-3xl w-[8rem] md:w-[8rem] justify-center items-center flex'
                      onClick={addToCart}
                      disabled={addingCart}
                    >
                    <p className='text-sm'>ADD TO CART</p>
                    </button>
                    }
                    <button
                        type="button"
                        className=' bg-blue-500 text-white px-4 py-2 rounded-3xl w-[8rem] md:w-[8rem]'
                        onClick={handlePurchaseClick}
                    >
                        <p className='text-sm'>BUY NOW</p>
                    </button>
                </div>
            </div>
            <div className="border-2 border-black mr-10 w-[100%] h-fit md:h-[45%] p-4 md:mt-5">
                <p className='mb-3'>
                    DESCRIPTION
                </p>
                <p>
                    {description ? description : 'loading description....'} 
                </p>
            </div>
        </div>
        {/* Popup */}
        {sharedState && (
            <ConfirmPurchasePopUp itemName={` of ${name}`} price={price} id={itemId} amount={count} />
        )}
    </div>
  )
}

export default ProductsDetails