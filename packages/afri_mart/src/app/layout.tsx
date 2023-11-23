// components/Layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { StarknetProvider } from '@/components/starknet-provider';
import { YourContextProvider } from '../context/YourContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <YourContextProvider>
          <StarknetProvider>{children}</StarknetProvider>
        </YourContextProvider>
      </body>
    </html>
  );
};

export default Layout;
