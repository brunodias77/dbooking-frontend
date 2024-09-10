/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from './button';
import Link from 'next/link';

interface UserData {
    email?: {
        value: string;
    };
}

interface HeaderProps {
    data: UserData;
}
const Header: React.FC<HeaderProps> = ({ data }) => {
    const [state, setState] = useState(false)

    const navigations = [
        { title: "Reservas", path: "#booking" },
        { title: "Instalações", path: "#facilities" },
        { title: "Sobre nós", path: "#about" },
        { title: "Localização", path: "#location" },
        { title: "Contato", path: "#contato" }
    ];

    return (
        <nav className="z-50 sticky top-0 shadow-md mt-4 w-full bg-white text-white   ">
            <div className='max-w-screen-xl mx-auto flex items-center justify-between '>
                <Link href="/">
                    <Image
                        src="/assets/dbooking_logo.svg"
                        alt="DBooking Logo"
                        width={60}
                        height={60}
                    />
                </Link>
                <div className="md:hidden">
                    <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                        onClick={() => setState(!state)}
                    >
                        {
                            state ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                            )
                        }
                    </button>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigations.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-gray-600 hover:text-indigo-600">
                                        <a href={item.path}>
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {data?.email ? (
                    <div className='hidden md:inline-block'>
                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-green-500 rounded-full">
                            <span className="font-medium text-white">
                                {data.email.value.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <span className='text-gray-800 ml-4'>{data.email.value}</span>
                    </div>
                ) : (
                    <Link href="/login" className="hidden md:inline-block" >
                        <Button label='Login' />
                    </Link>
                )}
            </div>
            {/* <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <Link href="/">
                    <Image
                        src="/assets/dbooking_logo.svg"
                        alt="DBooking Logo"
                        width={60}
                        height={60}
                    />
                </Link>
                <div className="md:hidden">
                    <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                        onClick={() => setState(!state)}
                    >
                        {
                            state ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                            )
                        }
                    </button>
                </div>
            </div>
            <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    {
                        navigations.map((item, idx) => {
                            return (
                                <li key={idx} className="text-gray-600 hover:text-indigo-600">
                                    <a href={item.path}>
                                        {item.title}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {data?.email ? (
                <div className='hidden md:inline-block'>
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-green-500 rounded-full">
                        <span className="font-medium text-white">
                            {data.email.value.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span className='text-gray-800 ml-4'>{data.email.value}</span>
                </div>
            ) : (
                <Link href="/login" className="hidden md:inline-block" >
                    <Button label='Login' />
                </Link>
            )} */}
        </nav >


    );
};

export default Header;
