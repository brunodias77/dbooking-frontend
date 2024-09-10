import LoginForm from '@/components/login/login-form';
import React from 'react';
import Image from 'next/image';
const LoginPage = () => {
    return (
        <div className='max-w-screen-xl h-full mx-auto flex flex-col items-center justify-center'>
            <div className="animeLeft w-[40%] bg-white rounded-lg shadow p-10">
                <div className="mb-4 flex justify-center items-center gap-3 text-gray-800 font-bold">
                    <Image
                        src="/assets/dbooking_logo.svg"
                        alt="DBooking Logo"
                        width={72}
                        height={16}
                    />
                    <span>DBooking</span>
                </div>
                <div className="space-y-4 md:space-y-6">
                    <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
                        Entre na sua conta
                    </h1>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;