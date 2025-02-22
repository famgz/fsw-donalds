import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: 'FSW Donalds',
  description: 'Fast Food App',
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
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
