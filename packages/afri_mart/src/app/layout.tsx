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
import { ConnectionContextProvider, AccountContextProvider, RatingContextProvider } from '../context/connectionContext'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ListProductContextProvider } from '../context/listProductContext';
// import { ConnectkitProvider } from '../../connectkit';
import { ChakraProvider } from '@chakra-ui/react'
import { LoadingContextProvider } from '../context/connectionContext';
import { ReviewContextProvider } from '../context/reviewContext';

import PagesLayout from './PagesLayout';
import AppProvider from '../context/provider'

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const connectors = [
    new InjectedConnector({ options: { id: 'braavos' } }),
    new InjectedConnector({ options: { id: 'argentX' } }),
  ];
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={clsx("", inter.className)}>
      <ChakraProvider>
        <ConnectionContextProvider>
        <RatingContextProvider>
        <ReviewContextProvider>
        <LoadingContextProvider>
          <AccountContextProvider>
            <ListProductContextProvider>
              <SupplyChainContextProvider>
                <RegisteredContextProvider>
                  <YourContextProvider>
                    <StarknetProvider>
                      <QueryClientProvider client={queryClient}>
                        <AppProvider>
                        <PagesLayout>{children}</PagesLayout>
                        </AppProvider>
                      </QueryClientProvider>
                    </StarknetProvider>
                  </YourContextProvider>
                </RegisteredContextProvider>
              </SupplyChainContextProvider>
            </ListProductContextProvider>
          </AccountContextProvider>
          </LoadingContextProvider>
          </ReviewContextProvider>
        </RatingContextProvider>
        </ConnectionContextProvider>
        </ChakraProvider>
      </body>
    </html >
  );
};

export default Layout;
