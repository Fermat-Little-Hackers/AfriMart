"use client"

// components/Layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { StarknetProvider } from '@/components/starknet-provider';
import { SupplyChainContextProvider } from '../context/supplyChainContext';
import './globals.css';
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
import { Chain, goerli, mainnet } from '@starknet-react/chains';
import { ProviderInterface, RpcProvider, provider } from 'starknet';
import clsx from 'clsx';
import { RegisteredContextProvider } from '../context/registeredContext';
import { YourContextProvider } from '../context/YourContext';
import { ConnectkitProvider } from '../../connectkit';


const inter = Inter({ subsets: ['latin'] });

const provider = new RpcProvider({ nodeUrl: process.env.NEXT_PUBLIC_RPC ?? "" });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' } }),
    new InjectedConnector({ options: { id: 'argentX' } }),
  ];
  return (
    <html lang="en">
      <body className={clsx("", inter.className)}>
        <StarknetConfig 
            connectors={connectors} 
            chains={[goerli, mainnet, goerli]} 
            provider={function (chain: Chain): ProviderInterface | null {
              if (chain == goerli) {
                return new RpcProvider({ nodeUrl: process.env.NEXT_PUBLIC_RPC?? "" });
              } else {
                return new RpcProvider({ nodeUrl: ''})
              }
            }}
          >
            <ConnectkitProvider config={{provider}} >

        <SupplyChainContextProvider>
        <RegisteredContextProvider>
          <YourContextProvider>
            <StarknetProvider>{children}</StarknetProvider>
          </YourContextProvider>
        </RegisteredContextProvider>
        </SupplyChainContextProvider>
            </ConnectkitProvider>
        </StarknetConfig>
      </body>
    </html>
  );
};

export default Layout;
