import React, { useEffect, useState } from 'react'
import Stars from '../../../../components/market-place/stars'
import { FaUser } from 'react-icons/fa';
import { CheckIcon } from '@heroicons/react/20/solid';
import rattingsContract from '@/ABI/rattingsContract.json';
import { MarketPlaceAddr, RattingAddr } from '@/components/addresses';
import { Account, Contract, Provider, constants, AccountInterface, CairoCustomEnum, CallData } from 'starknet'
import marketPlaceAbi from '@/ABI/marketPlace';
import marketplaceAbi from '@/ABI/marketPlace';


interface MyProps {
    itemId: number;
  }

const ProductsReviews: React.FC<MyProps> = ({ itemId }) => {
    const [products, setProducts] = useState<any[]>();
    const [buyerNames, setBuyerNames] = useState<string[]>();

    const getProduct = async() => {
      const provider = new Provider({
        rpc: {
          nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
        }
      })
        try {
            const contract = new Contract(rattingsContract, RattingAddr(), provider);
            const details = await contract.viewReviews(itemId);

            getUserProfile(details);
            // const products = res.map((item:any) => item.toString())

          setProducts(details);
        } catch (error : any) {      
          console.log(error.message);
        }
    }
        // const intervalId = setInterval(getProduct, 3000);
  
            useEffect(() => {
              getProduct();
  
            }, [itemId])

  
        const getUserProfile = async(users: any) => {
            const buyersArray: string[] = [];
            const provider = new Provider({
                rpc: {
                // nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
                nodeUrl: "https://rpc.starknet-testnet.lava.build"
                }
            })
            try {
                const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), provider)
                for (const user of users) {
                    // Extract the 'buyer' property and append it to the buyersArray
                    const details = await contract.getUserProfile(user.buyer);
                    buyersArray.push((hexToReadableText(details.name.toString(16))));
                }

                setBuyerNames(buyersArray);

            } catch(error: any) {
                console.log(error.message);
            }
        }

            function hexToReadableText(hexString : any) {
                const bytes = Buffer.from(hexString, 'hex'); 
                const text = new TextDecoder('utf-8').decode(bytes);
                return text;
              }

        



  return (
    <div className='bg-art-graphics p-5 md:p-12'>

    <div className=" bg-[var(--ivory)] rounded-md h-fit md:h-fit px-5 py-5 md:px-10 md:py-7 flex flex-col gap-5 md:gap-7 items-center md:w-max mx-auto min-w-[70vw] md:min-h-[20rem]">
        <div className="">
            <h1 className='md:text-4xl text-3xl text-ceter font-serif'>
                REVIEWS
            </h1>                    
        </div>

        {products && products?.length > 0 ? products?.map((product, index) => (
            <div className="flex flex-row gap-5 md:gap-10" key={index}>
                <div className="">
                    <div className="border-solid border-2 border-black h-[3rem] rounded-3xl w-[3rem] flex items-center justify-center">
                        <FaUser />
                    </div>
                </div>
                <div className="w-[80%] flex flex-col gap-1">
                    <p className='font-bold'> {buyerNames ? buyerNames[index] : 'Loading Buyer...'}</p>
                    <p>{(hexToReadableText(product.review1.toString(16)))}{(hexToReadableText(product.review2.toString(16)))}</p>
                        <div>
                            <Stars amount={Number(product.rating)}/>
                        </div>
                </div>
            </div>
        )) : <p className=' text-gray-700'> No Reviews Yet </p>}

    </div>
    </div>
  )
}

export default ProductsReviews