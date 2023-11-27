// components/Layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { StarknetProvider } from '@/components/starknet-provider';
import { YourContextProvider } from '../context/YourContext';
import { RegisteredContextProvider } from '../context/registeredContext';
import { SupplyChainContextProvider } from '../context/supplyChainContext';
import './globals.css';
import PagesLayout from './PagesLayout';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupplyChainContextProvider>
          <RegisteredContextProvider>
            <YourContextProvider>
              <StarknetProvider>
                <PagesLayout>{children}</PagesLayout>
              </StarknetProvider>
            </YourContextProvider>
          </RegisteredContextProvider>
        </SupplyChainContextProvider>
      </body>
    </html>
  );
};

export default Layout;
