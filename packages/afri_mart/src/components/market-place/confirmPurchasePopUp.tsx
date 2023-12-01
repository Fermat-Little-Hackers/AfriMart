import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useYourContext } from "../../context/YourContext";
import marketplaceAbi from '../../ABI/marketPlace'
import { Account, Contract, Provider, constants, AccountInterface, ProviderInterface } from 'starknet'
import { MarketPlaceAddr } from '../../components/addresses';
import {type ConnectedStarknetWindowObject, connect, disconnect, } from '@argent/get-starknet'
import {EthAddr} from '../../components/addresses';
import erc20abi from '../../ABI/erc20.json'

interface ConfirmPurchasePopUpProps {
  itemName: string;
  price: number;
  id: any;
  amount: any;
  isCart: boolean;
}

function ConfirmPurchasePopUp({ itemName, price, id, amount, isCart }: ConfirmPurchasePopUpProps) {
  const { sharedState, setSharedState } = useYourContext();
  const [waitText, setWaitText] = useState(
    `Confirm you intend to make a purchase ${itemName} worth ${price * amount} Eth from AfriMart`
  );
  const [imageSrc, setImageSrc] = useState("/image/wait.svg");
  const [isDisabled, setIsDisabled] = useState(false);
  // const [connection, setConnection] = useState('');
  const [account, setAccount] = useState<ProviderInterface | AccountInterface | undefined>();
  const [address, setAddress] = useState('');
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
  const [paid, setPaid] = useState<boolean>(false);

  const handleProcessPayment = () => {
    setIsDisabled(true);
    setImageSrc((prevSrc) =>
      prevSrc === "/image/wait.svg" ? "/image/loading.svg" : "/image/wait.svg"
    );
    setWaitText("Processing transaction, please wait");
    isCart ? checkoutCart() : purchaseProduct();
  };

  const handlePaymentCompleted = () => {
    setIsDisabled(false);
    setImageSrc((prevSrc) =>
      prevSrc === "/image/loading.svg" ? "/image/check-circle.svg" : "/image/wait.svg"
    );
    setWaitText(
      "Paymet successful please click on the Continue button to proceed"
    );
    setPaid(true);
    // setSharedState(false);
  }

  const handleCancelPayment = () => {
    setIsDisabled(false);
    setImageSrc((prevSrc) =>
      prevSrc === "/image/wait.svg" || prevSrc === "/image/check-circle.svg" ? "/image/loading.svg" : "/image/wait.svg"
    );
    setWaitText(
      "Confirm you intend to make a purchase wort $650 from AfriMart"
    );
    setSharedState(false);
  };




  const purchaseProduct = async() => {
    const ERC_ADDRESS = EthAddr();
    const Eth = 1000000000000000000;
    const defAmount = 100000000000000;
    let Tfee = amount == 1 && Eth * price < defAmount ? defAmount : (Eth * price) * amount;
    // console.log(`amount....${Tfee}`)
    const CONTRACT_ADDRESS = MarketPlaceAddr();
    const ERC20contract = new Contract(erc20abi.erc20abi, ERC_ADDRESS, account)
    const erc20Call = ERC20contract.populate('approve', [CONTRACT_ADDRESS, Tfee])

    const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), account)
    const collective_inputs = [id, amount];
    const myCall = contract.populate('purchaseProduct', collective_inputs)

    //@ts-ignore
    const multiCall = await account.execute(
        [
            {
                contractAddress: ERC_ADDRESS,
                entrypoint: "approve",
                calldata: erc20Call.calldata
            },
            {
                contractAddress: CONTRACT_ADDRESS,
                entrypoint: "purchaseProduct",
                calldata: myCall.calldata
            }
        ]
    )
    // console.log("Multicall: ", multiCall)
    //@ts-ignore
    account?.provider.waitForTransaction(multiCall.transaction_hash).then(() => {
    }).catch((e: any) => {
        console.log("Error: ", e)
    }).finally(() => {
      handlePaymentCompleted();
    })
}

  const checkoutCart = async() => {
    const ERC_ADDRESS = EthAddr();
    const Eth = 1000000000000000000;
    const defAmount = 100000000000000;
    let Tfee = amount == 1 && Eth * price < defAmount ? defAmount : (Eth * price) * amount;
    // console.log(`amount....${Tfee}`)
    const CONTRACT_ADDRESS = MarketPlaceAddr();
    const ERC20contract = new Contract(erc20abi.erc20abi, ERC_ADDRESS, account)
    const erc20Call = ERC20contract.populate('approve', [CONTRACT_ADDRESS, Tfee])

    const contract = new Contract(marketplaceAbi, MarketPlaceAddr(), account)
    // const collective_inputs = [ ];
    const myCall = contract.populate('checkOutCart', [])

    //@ts-ignore
    const multiCall = await account.execute(
        [
            {
                contractAddress: ERC_ADDRESS,
                entrypoint: "approve",
                calldata: erc20Call.calldata
            },
            {
                contractAddress: CONTRACT_ADDRESS,
                entrypoint: "checkOutCart",
                calldata: myCall.calldata
            }
        ]
    )
    // console.log("Multicall: ", multiCall)
    //@ts-ignore
    account?.provider.waitForTransaction(multiCall.transaction_hash).then(() => {
    }).catch((e: any) => {
        console.log("Error: ", e)
    }).finally(() => {
      handlePaymentCompleted();
    })
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



  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-70">
      <div className="bg-white p-5 md:p-10 rounded-md text-center w-[70%] md:w-[40%] h-fit">
        <div className="w-[100%] h-fit flex items-center justify-center md:mb-5">
          <div className=" md:w-[20%] md:h-[40%] w-[50%]">
            <Image
              src={imageSrc} // Path to your image from the public directory
              alt="Example Image"
              className="w-full max-w-md" // Adjust the styling as needed
              width={3}
              height={3}
            />
          </div>
        </div>
        <p className="text-base md:text-xl mb-5 md:mb-7">{waitText}</p>
        {!paid ?  <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 md:mr-5 text-sm md:text-lg"
            onClick={handleProcessPayment}
            disabled={isDisabled}
          >
            Confirm
          </button>
          :
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 md:mr-5 text-sm md:text-lg"
            onClick={handleCancelPayment}
          >
            Continue
          </button>}
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded-md text-sm md:text-lg"
          onClick={handleCancelPayment}
        >
          Cancel
        </button>
      </div>
    </div>
  );

}

export default ConfirmPurchasePopUp;
