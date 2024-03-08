import { Inter } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

import { Loading } from '@/components/loading-page';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo List App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
      <Toaster />
    </html>
  );
}
