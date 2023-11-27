"use client"

// components/Layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { StarknetProvider } from '@/components/starknet-provider';
import { SupplyChainContextProvider } from '../context/supplyChainContext';
import './globals.css';
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
// import {YourContextProvider} from '../context/YourContext;
import { Chain, goerli, mainnet } from '@starknet-react/chains';
import { ProviderInterface, RpcProvider } from 'starknet';
import clsx from 'clsx';
import { RegisteredContextProvider } from '../context/registeredContext';
import { YourContextProvider } from '../context/YourContext';


const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' } }),
    new InjectedConnector({ options: { id: 'argentX' } }),
  ];
  return (
    <html lang="en">
      <body className={clsx("bg-[var(--black-2)] bg-grainy-pattern ", inter.className)}>
        <StarknetConfig 
            connectors={connectors} 
            chains={[mainnet, goerli]} 
            provider={function (chain: Chain): ProviderInterface | null {
              if (chain == goerli) {
                return new RpcProvider({ nodeUrl: process.env.NEXT_PUBLIC_RPC?? "" });
              } else {
                return new RpcProvider({ nodeUrl: ''})
              }
            }}
          >
        <SupplyChainContextProvider>
        <RegisteredContextProvider>
          <YourContextProvider>
            <StarknetProvider>{children}</StarknetProvider>
          </YourContextProvider>
        </RegisteredContextProvider>
        </SupplyChainContextProvider>
        </StarknetConfig>
      </body>
    </html>
  );
};

export default Layout;
