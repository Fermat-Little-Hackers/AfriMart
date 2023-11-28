import React from 'react'
import {useState} from 'react'
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'

import ProductAmountButton from './productButton'
import Stars from '../../../../components/market-place/stars'
import { useYourContext } from '../../../../context/YourContext';
import ConfirmPurchasePopUp from '@/components/market-place/confirmPurchasePopUp';
import { useAccount, useContractRead } from "@starknet-react/core";
import { MarketPlaceAddr } from '../../../../components/addresses';
import { useEffect } from 'react';
import marketplaceAbi from '../../../../ABI/marketPlace'
import { Account, Contract, Provider, constants, AccountInterface } from 'starknet'
import dummy from '../../../../ABI/dummy.json'

interface MyProps {
    itemId: number;
  }

const ProductsDetails : React.FC<MyProps> = ({ itemId }) => {
    const { sharedState, setSharedState} = useYourContext();
    const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
    const [account, setAccount] = useState();
    const [address, setAddress] = useState('');

    const [name, setName] = useState<any>();
    const [seller, setSeller] = useState<any>();
    const [sellerName, setSellerName] = useState<any>();
    const [description, setDescription] = useState<any>();
    const [price, setPrice] = useState<any>();
    const [imgUri, setImgUri] = useState<any>();


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
            let eth = 1000000000000000000;
            console.log(details);
            setSellerName(hexToReadableText(details.name.toString(16)));
            console.log(`checksss: ${hexToReadableText(details.name.toString(16))}`);

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
          // console.log('0x' + (user.name.toString(16)).toString())
            // const res = hexToReadableText(user.name.toString(16))
            console.log(details)
            console.log(hexToReadableText(details.name.toString(16)))
            setName(hexToReadableText(details.name.toString(16)))
            // console.log(hexToReadableText(details.seller.toString(16)))
            console.log(Number(BigInt(details.price)) / eth);
            setPrice(Number(BigInt(details.price)) / eth);
            console.log(details.imageUri.toString(16));
            setImgUri(details.imageUri.toString(16));
            console.log(`0x${details.seller.toString(16)}`);
            setSeller(`0x${details.seller.toString(16)}`);
            console.log(hexToReadableText(details.description.toString(16)));
            setDescription(hexToReadableText(details.description.toString(16)));

            getUserProfile(`0x${details.seller.toString(16)}`);
          } catch (error : any) {      
            console.log(error.message);
          }
    }

        getProduct();
      
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

  return (
    <div className="flex flex-col md:flex-row md:gap-10 md:mx-20 my-5 md:my-20 md:h-[65vh] p-5 md:p-0">
        <div className="flex flex-col md:w-[40%] gap-2">
            <div className="border-2 border-black bg-gray-700 md:w-[20rem] h-[20rem]"></div>
            <div className='flex flex-col gap-2'>
                <div>
                    <Stars amount={2.5}/>
                </div>
                <p> Seller: {sellerName ? sellerName : 'loading....'}</p>
                {/* <p> Seller Address: 0x0h7y34.....7ys98s</p> */}
            </div>
        </div>

        <div className="border-2 border-black h-fit w-[100%] md:p-10 flex flex-col justify-between mt-5 md:mt-0">
            <div className='flex flex-col gap-3 p-5 md:p-0'>
                <p>{name ? name : "loading..."}</p>
                <p>{price ? price : '0.00'} Eth</p>
                <ProductAmountButton />
                <div className="flex flex-row gap-10">
                    <button
                        type="button"
                        className='bg-blue-500 text-white px-4 py-2 rounded-3xl'
                        onClick={handlePurchaseClick}
                    >
                        ADD TO CART
                    </button>
                    <button
                        type="button"
                        className=' bg-blue-500 text-white px-4 py-2 rounded-3xl'
                        onClick={handlePurchaseClick}
                    >
                        BUY NOW
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
            <ConfirmPurchasePopUp itemName={` of ${name}`} price={price} id={itemId} />
        )}
    </div>
  )
}

export default ProductsDetails