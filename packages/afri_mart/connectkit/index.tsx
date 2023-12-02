"use client"

import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { useState, useEffect } from 'react'
import { Contract, Provider, constants } from 'starknet'
import { IconWallet } from "@tabler/icons-react"
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaGoogleWallet } from 'react-icons/fa';
import { useConnectionContext, useAccountContext } from '@/context/connectionContext'
// import contractAbi from './abis/abi.json'
// const contractAddress = "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300"

function ConnectButtoN() {
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState('');
  const {ShareAddress, setShareAddress} = useConnectionContext()
  const {ShareAccount, setShareAccount} = useAccountContext()


  const [retrievedValue, setRetrievedValue] = useState('')

  useEffect(() => {
    const connectToStarknet = async() => {
      try {
        const connection = await connect({ modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" })
  
        if(connection && connection.isConnected) {
          setConnection(connection)
          setAccount(connection.account)
          setAddress(connection.selectedAddress)
          setShareAddress(connection.selectedAddress)
          setShareAccount(connection.account)
          console.log('shared')
        }
      } catch (error) {
        console.log(error)
      }
     
      //@ts-ignore
      // console.log(connection.chainId)
      //@ts-ignore
      // if(connection.chainId != 'SN_GOERLI') {
      //   try {
      //     await window?.starknet?.request({
      //       type: "wallet_switchStarknetChain",
      //       params: {
      //         chainId: "SN_GOERLI"
      //       }
      //     });
      //   }
      //   catch(error : any) {
      //     console.log(error)
      //   }
      // }
}
    connectToStarknet()
  }, [])

  const connectWallet = async() => {
    const connection = await connect({ webWalletUrl: "https://web.argent.xyz" })
    console.log(connection)
    if(connection && connection.isConnected) {
      setConnection(connection)
      setAccount(connection.account)
      setAddress(connection.selectedAddress)
      setShareAddress(connection.selectedAddress)
      setShareAccount(connection.account)
      console.log('shared')
    }

  }

  const disconnectWallet = async() => {
    await disconnect({ clearLastWallet: true });
    setConnection(undefined)
    setAccount(undefined)
    setAddress('')
    setShareAddress('')
    setShareAccount(null)


  }

  return (
    <div className="App">
      <header className="App-header">
        <main className="main">
            {
              connection ? 
              <button className="md:h-10 bg-[var(--terracota)] h-10 border-2 rounded-xl flex flex-row gap-2 justify-center items-center md:py-3 md:px-0 p-2" onClick={disconnectWallet}>

              <div className=''>
                <p className="description text-xs md:text-sm">
                {
                    address ? `${address.slice(0, 5)}.....${address.slice(-5)}` : ''
                }
                </p>
              </div>
                <div className='border-2 bg-red-700'>
                    <FaTimes stroke={1.5} />
                </div>
              
            </button>
              :
              <button className="h-10 bg-[var(--terracota)] border-2 rounded-xl flex flex-row gap-3 justify-center items-center p-3" onClick={connectWallet}>
              <div>
                <p className='flex text-sm md:text-base'>
                  Connect Wallet
                </p>
              </div>
              <div>
                <IconWallet stroke={1.5} />
              </div>
            </button>
            }

        </main>
      </header>
    </div>
  );
}

export default ConnectButtoN;