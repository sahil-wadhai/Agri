'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <div className="min-h-screen">{children}</div>
        <Footer/>
      </body>
    </html>
  );
}
