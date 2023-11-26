"use client"

// components/Layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { StarknetProvider } from '@/components/starknet-provider';
<<<<<<< HEAD
=======
import { YourContextProvider } from '../context/YourContext';
import { RegisteredContextProvider } from '../context/registeredContext';
>>>>>>> 464d566961aa3b0be8bc101278391f5eec7643d9
import './globals.css';
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
import { Chain, goerli, mainnet } from '@starknet-react/chains';
import { ProviderInterface, RpcProvider } from 'starknet';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
<<<<<<< HEAD
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
              return new RpcProvider({ nodeUrl: process.env.NEXT_PUBLIC_RPC });
            } else {
              return new RpcProvider({ nodeUrl: ''})
            }
          }}
      >
        <StarknetProvider>{children}</StarknetProvider>
      </StarknetConfig>
=======
  return (
    <html lang="en">
      <body className={inter.className}>
        <RegisteredContextProvider>
          <YourContextProvider>
            <StarknetProvider>{children}</StarknetProvider>
          </YourContextProvider>
        </RegisteredContextProvider>
>>>>>>> 464d566961aa3b0be8bc101278391f5eec7643d9
      </body>
    </html>
  );
};

export default Layout;
