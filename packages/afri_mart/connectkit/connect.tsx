"use client"

import {type ConnectedStarknetWindowObject, connect, disconnect } from '@argent/get-starknet'
import { useState, useEffect } from 'react'
import { Contract, Provider, constants } from 'starknet'
import { IconWallet } from "@tabler/icons-react"
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaGoogleWallet } from 'react-icons/fa';
import { useConnectionContext, useAccountContext } from '@/context/connectionContext'
import { useAppContext } from '@/context/provider'
// import contractAbi from './abis/abi.json'
// const contractAddress = "0x077e0925380d1529772ee99caefa8cd7a7017a823ec3db7c003e56ad2e85e300"

function ConnectButtoN() {
  const { handleConnetWalletBtnClick, address, handleDisconnectWalletBtnClick, connection } = useAppContext()
  
  return (
    <div className="App">
      <header className="App-header">
        <main className="main">
            {
              connection ? 
              <button className="md:h-10 bg-[var(--terracota)] h-10 border-2 rounded-xl flex flex-row gap-2 justify-center items-center md:py-3 md:px-0 p-2" onClick={handleDisconnectWalletBtnClick}>

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
              <button className="h-10 bg-[var(--terracota)] border-2 rounded-xl flex flex-row gap-3 justify-center items-center p-3" onClick={handleConnetWalletBtnClick}>
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