import React from 'react';
import Image from 'next/image';
import RegisterForm from '@/components/register/register-form';
const RegisterPage = () => {
    return (
        <div className='max-w-screen-xl mx-auto flex items-center justify-center  h-full'>
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md p-6 sm:p-8 animeLeft">
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
                    <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray_800 md:text-2xl">
                        Registre-se
                    </h1>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;