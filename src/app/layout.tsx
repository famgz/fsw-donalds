import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';

import Cart from '@/components/cart';
import { CartProvider } from '@/context/cart';

export const metadata: Metadata = {
  title: 'Tasty Hub',
  description: 'Tasty Food App',
};

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <CartProvider>
          <Toaster />
          <Cart />
          <div className="expand min-h-screen bg-muted-foreground/10">
            <div className="expand mx-auto h-full w-full max-w-lg overflow-hidden bg-background">
              {children}
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
