import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import StoreProvider from './StoreProvider';
import Auth from '@/components/auth/Auth';
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tokopedya',
  description: 'Grocery App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <StoreProvider>
            <Auth>
              {children}
              <ToastContainer position='bottom-right' />
            </Auth>
          </StoreProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
