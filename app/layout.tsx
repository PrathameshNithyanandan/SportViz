import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import ApiStats from '@/components/ApiStats';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SportViz - International Sports Dashboard',
  description: 'Real-time international cricket and football match updates and statistics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar>{children}</Sidebar>
        <ApiStats />
      </body>
    </html>
  );
}
