import React from 'react'
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import {useListProductContext} from '../../../context/listProductContext'
import main from '../../../../utils/upload.mjs';
import marketPlaceAbi from '@/ABI/marketPlace';
import { MarketPlaceAddr } from '@/components/addresses';
import { Account, Contract, Provider, constants, AccountInterface, CairoCustomEnum } from 'starknet'
import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'


interface FormData {
    productImage: FileList | null;
    // name: string;
    // state: string;
    // country: string;
  }


const ListProductForm: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex md:items-center justify-center bg-gray-700 bg-opacity-70">
    <div className="md:max-w-xl w-[80%] h-fit flex flex-col justify-center mt-[6vh] md:mt-0 p-6 md:p-10 bg-gray-100 rounded-md shadow-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Upload Product Details
          </h2>
        </div>
        <div className=''>
        {FormField()}
        </div>

      </div>
      </div>
  )
}


const FormField = () => {
    const { sharedState, setSharedState } = useListProductContext();
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [imageUri1, setImageUri1] = useState<string | null>(null);
    const [imageUri2, setImageUri2] = useState<string | null>(null);
    const [price, setPrice] = useState<Number | null>(null);
    const [amount, setAmount] = useState<Number | null>(null);
    // const [waitText, setWaitText] = useState(`Confirm you intend to make a purchase ${itemName} worth $${price} from AfriMart`);
    const [imageSrc, setImageSrc] = useState('/image/wait.svg');
    const [isDisabled, setIsDisabled] = useState(false);
    const [imageblob, setImageBlob] = useState<File | undefined >()
    const { register, handleSubmit, setValue, formState: { errors }  } = useForm<FormData>();
    const dropdownOptions = ['Agriculture', 'Textile and Clothing', 'Accesories', 'Tools and Equipments', 'Digital Arts','Artifacts and Physical Arts'];
    const [selectedOption, setSelectedOption] = useState<string>();
    const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
    const [account, setAccount] = useState();
    const [address, setAddress] = useState('');
    const [listing, setListing] = useState<boolean>();

    const Fetchcategories = (Itemindex: number) => { 
       const cart = [
        'Agriculture',
        'TextileAndClothings',
        'Accesories',
        'ToolsAndEquipments',
        'DigitalArts',
        'PhysicalArtsNDSculptures',
      ]
      return cart[Itemindex];
    }

    const listProduct = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const provider = new Provider({
          rpc: {
            // nodeUrl: "https://starknet-goerli.g.alchemy.com/v2/mIOPEtzf3iXMb8KvqwdIvXbKmrtyorYx" 
            nodeUrl: "https://rpc.starknet-testnet.lava.build"
          }
        })
          try {
            setListing(true);
            let ipfsDetails = await main(imageblob,name,name)
            let length = (ipfsDetails?.ipnft).length; 
            let halfLength = Math.floor(length / 2)
            
            let firstHalf = (ipfsDetails?.ipnft).substring(0, halfLength)
            let secondhalf = (ipfsDetails?.ipnft).substring(halfLength)
            const contract = new Contract(marketPlaceAbi, MarketPlaceAddr(), account)
            const details = await contract.listProduct(name, description, firstHalf, secondhalf, price, amount, resolveCartegory(findCategoryIndex(selectedOption as string)));
            setListing(false);
            alert("Item Listed Successfully");
            setSharedState(false);
        } catch (error : any) {      
                    console.log(error.message);
                }
        }


    function resolveCartegory(cartIndex: number): any {
        const myCustomEnum0 = new CairoCustomEnum({
            Agriculture : cartIndex,
        }); 
        const myCustomEnum1 = new CairoCustomEnum({
            TextileAndClothings : cartIndex,
        }); 
        const myCustomEnum2 = new CairoCustomEnum({
            Accesories : cartIndex,
        }); 
        const myCustomEnum3 = new CairoCustomEnum({
            ToolsAndEquipments : cartIndex,
        }); 
        const myCustomEnum4 = new CairoCustomEnum({
            DigitalArts : cartIndex,
        }); 
        const myCustomEnum5 = new CairoCustomEnum({
            PhysicalArtsNDSculptures : cartIndex,
        }); 

       if (cartIndex == 0 ) {
        return myCustomEnum0;
       } else if (cartIndex == 1) {
        return myCustomEnum1;
       } else if (cartIndex == 2) {
        return myCustomEnum2;
       } else if (cartIndex == 3) {
        return myCustomEnum3;
       } else if (cartIndex == 4) {
        return myCustomEnum4;
        } else if (cartIndex == 5) {
            return myCustomEnum5;
        };
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
  }, [])  



    function findCategoryIndex(categoryName: string): number {
        const categories = [
          'Agriculture',
          'Textile and Clothing',
          'Accesories',
          'Tools and Equipments',
          'Digital Arts',
          'Artifacts and Physical Arts',
        ];
      
        const index = categories.indexOf(categoryName);
        return index;
    }

    const handleProcessPayment = () => {
        setIsDisabled(true);
        setImageSrc((prevSrc) => (prevSrc === '/image/wait.svg' ? '/image/loading.svg' : '/image/wait.svg'));
        // setWaitText( 'Processing transaction, please wait');
    };

    const handleCancelProfile = () => {
        setSharedState(false);
        setIsDisabled(false);
        setImageSrc((prevSrc) => (prevSrc === '/image/wait.svg' ? '/image/loading.svg' : '/image/wait.svg'));
        // setWaitText( 'Confirm you intend to make a purchase wort $650 from AfriMart');
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // Handle the form submission logic (e.g., send data to server)
        // setSubmittedData(data);
        let ipfsDetails = await main(imageblob,name,name)
        console.log('Returned ipfs hash after upload',ipfsDetails);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
        // Set the preview image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
        setImageBlob(file)
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
    }
    const handleAmountAvailableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    }


    interface DropdownProps {
        options: string[];
      }
    
    const Dropdown: React.FC<DropdownProps> = ({ options }) => {
      
        const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
          setSelectedOption(event.target.value);
        };
      
        return (
          <select value={selectedOption} onChange={handleChange} className=' w-[100%] h-[2.5rem] rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2'>
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      };


    return (
        <div className="mt-5 md:mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="" onSubmit={listProduct}>
          <div>
            <label htmlFor="productImage" className="block text-sm font-medium leading-6 text-gray-900">
              Item Image
            </label>
            <div className='flex flex-col md:flex-row'>
                  <div>
                      {previewImage && (
                          <Image
                          src={previewImage}
                          alt="Preview"
                          width={2}
                          height={2}
                          className="mt-2 w-16 h-16 object-cover md:mr-5 rounded-full border border-gray-300"
                          />
                      )}
                  </div>
                  <div className="flex items-center justify-center">
                      <input
                      id="productImage"
                      name="productImage"
                      type="file"
                      onChange={handleImageChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                  </div>
              </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleNameChange}
                maxLength={31}
                autoComplete="name"
                required
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-1">
              <input
                id="description"
                name="description"
                type="text"
                onChange={handleDescriptionChange}
                maxLength={31}
                autoComplete="description"
                required
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Price
            </label>
            <div className="mt-1">
              <input
                id="price"
                name="price"
                type="number"
                onChange={handlePriceChange}
                required
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Amount Available
            </label>
            <div className="mt-1">
              <input
                id="amountAvailable"
                name="amountAvailable"
                type="number"
                onChange={handleAmountAvailableChange}
                required
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className='mb-2'>
            <label htmlFor="dropdown" className='block text-sm font-medium leading-6 text-gray-900'>Cartegory:</label>
            <Dropdown options={dropdownOptions} />
          </div>

          <div className='flex flex-row gap-5 items-center justify-center mt-5'>
            { listing ? 
            <button
                type="button"
                className='bg-indigo-600 text-white px-4 py-2 rounded-3xl w-[8rem] md:w-[8rem] justify-center items-center flex'
            >
                <Image src={'/image/loading.svg'} alt="Example Image" className="w-[1.5rem] md:w-[1.5rem]" width={1} height={1} />
            </button>
            :
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              List Product
            </button>
            }
              <button
                  type="button"
                  className="bg-gray-500 rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleCancelProfile}
                  >
                  Cancel
              </button>
          </div>
        </form>
      </div>
    )
}



export default ListProductForm