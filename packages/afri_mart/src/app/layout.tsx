"use client"

// components/Layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { StarknetProvider } from '@/components/starknet-provider';
import './globals.css';
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
import { Chain, goerli, mainnet } from '@starknet-react/chains';
import { ProviderInterface, RpcProvider } from 'starknet';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' } }),
    new InjectedConnector({ options: { id: 'argentX' } }),
  ];
    return (
      <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
};

export default Layout;
