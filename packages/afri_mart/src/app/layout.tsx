"use client"

// components/Layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { StarknetProvider } from '@/components/starknet-provider';
import { SupplyChainContextProvider } from '../context/supplyChainContext';
import './globals.css';
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
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
      <body className={clsx("", inter.className)}>
        <SupplyChainContextProvider>
        <RegisteredContextProvider>
          <YourContextProvider>
            <StarknetProvider>{children}</StarknetProvider>
          </YourContextProvider>
        </RegisteredContextProvider>
        </SupplyChainContextProvider>
      </body>
    </html>
  );
};

export default Layout;
