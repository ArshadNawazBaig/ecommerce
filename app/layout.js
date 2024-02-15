import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/providers/auth-provider';
import StoreProvider from '@/providers/store-provider';
import ModalProvider from '@/providers/modal-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthProvider>
            <ModalProvider />
            {children}
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
