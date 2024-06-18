import { Inter } from 'next/font/google';
import '@/app/_styles/globals.css';
import Header from './_components/Header';
const inter = Inter({ subsets: ['latin'] });
import FooterSection from '@/app/_components/FooterSection';

export const metadata = {
  title: 'Jejak Wisata',
  description: 'Jejak Wisata',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
