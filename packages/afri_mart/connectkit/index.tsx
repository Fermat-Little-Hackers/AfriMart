"use client"

import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { useState, useEffect } from 'react'
import { Contract, Provider, constants } from 'starknet'
import { IconWallet } from "@tabler/icons-react"
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaGoogleWallet } from 'react-icons/fa';

// import contractAbi from './abis/abi.json'
// const contractAddress = "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300"

function ConnectButtoN() {
  const [connection, setConnection] = useState<ConnectedStarknetWindowObject | null>();
  const [account, setAccount] = useState();
  const [address, setAddress] = useState('');

  const [retrievedValue, setRetrievedValue] = useState('')

  useEffect(() => {
    const connectToStarknet = async() => {
      const connection = await connect({ modalMode: "neverAsk", webWalletUrl: "https://web.argent.xyz" })

      if(connection && connection.isConnected) {
        setConnection(connection)
        setAccount(connection.account)
        setAddress(connection.selectedAddress)
      }

      if(connection?.chainId !== 'SN_GOERLI') {
        alert("you need to switch to GOERLI to proceed!")
        try {
          await window?.starknet?.request({
            type: "wallet_switchStarknetChain",
            params: {
              chainId: "SN_GOERLI"
            }
          });
        }
        catch(error : any) {
          alert(error.message)
        }
      }
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
    }

  }

  const disconnectWallet = async() => {
    await disconnect({ clearLastWallet: true });
    setConnection(undefined)
    setAccount(undefined)
    setAddress('')
  }

//   const increaseCounter = async() => {
//     try {
//       const contract = new Contract(contractAbi, contractAddress, account)
//       await contract.increment()
//       alert("you successfully increased the counter")
//     }
//     catch(error) {
//       console.log(error.message)
//     }
//   }

//   const decreaseCounter = async() => {
//     try {
//       const contract = new Contract(contractAbi, contractAddress, account)
//       await contract.decrement()
//       alert("you sucessfully decreased the counter")
//     }
//     catch(error) {
//       console.log(error.message)
//     }
//   }

//   const getCounter = async() => {
//     const provider = new Provider( {sequencer: { network:constants.NetworkName.SN_MAIN } } )
//     try {
//       const contract = new Contract(contractAbi, contractAddress, provider)
//       const counter = await contract.get_current_count()
//       setRetrievedValue(counter.toString())
//     }
//     catch(error) {
//       console.log(error.message)
//     }
//   } 

  return (
    <div className="App">
      <header className="App-header">
        <main className="main">
            {
              connection ? 
            <button className="h-10 border-2 rounded-xl flex flex-row gap-3 justify-center items-center p-3" onClick={disconnectWallet}>
              <div>
                <p>
                  Disconnect Wallet
                </p>
                <p className="description">
                {
                    address ? address : ''
                }
                </p>
              </div>
              <div>
                <FaTimes stroke={1.5} />
              </div>
            </button>
              :
            <button className="h-10 border-2 rounded-xl flex flex-row gap-3 justify-center items-center p-3" onClick={connectWallet}>
              <div>
                <p>
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