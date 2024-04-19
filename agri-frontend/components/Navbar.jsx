// components/Navbar.js
'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar(){
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className=" border-gray-200 bg-[#343a40] font-sans">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/tree_logo.png" className="h-8" alt="Agrisense-Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">AgriSense</span>
        </Link>
        <button data-collapse-toggle="navbardefault" type="button" aria-expanded={!isNavCollapsed ? true : false} onClick={handleNavCollapse} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbardefault">
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:mr-8  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  bg-[#343a40] border-gray-700">
            <li>
                <Link href="/" className="block py-2 px-3 rounded hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 text-white">
                    Home
                </Link>
            </li>
            <li>
            <Link href="/crop" className="block py-2 px-3 rounded hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 text-white">Crop</Link>
            </li>
            <li>
            <Link href="/fertilizer" className="block py-2 px-3 rounded hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 text-white">Fertilizer</Link>
            </li>
            <li>
            <Link href="/dashboard" className="block py-2 px-3 rounded hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 text-white">Dashboard</Link>
            </li>
        </ul>
        </div>
    </div>
    </nav>
  );
};

