"use client";
import React from 'react';
import SearchRoomHome from './search-room-home';


const BannerHome = () => {
    return (
        <div className='relative h-screen w-full mt-5 max-w-screen-xl mx-auto'>
            <div
                className='rounded-3xl bg-cover bg-center flex items-center justify-center w-full h-full'
                style={{
                    backgroundImage: `url('/assets/banner_01.jpg')`, // Referencia a imagem de dentro da pasta public
                    backgroundSize: 'cover', // Faz a imagem cobrir toda a div
                    backgroundPosition: 'center', // Centraliza a imagem
                    backgroundRepeat: 'no-repeat', // Evita repetição da imagem
                }}
            >
                <div className='z-10 text-justify px-11 py-20 w-[45%] mr-auto h-full bg-[#f6fcf9] rounded-tl-3xl rounded-bl-3xl flex flex-col items-center'>
                    <h2 className='text-2xl font-bold text-gray-900 md:text-5xl w-full '>
                        Encontre o lugar perfeito para ficar
                    </h2>
                    <p className='text-sm md:text-base mt-6 hidden text-gray-500 md:mt-10 md:block'>
                        Descubra o refúgio perfeito em nossos hotéis, onde cada detalhe é pensado para oferecer um descanso incomparável e uma estadia inesquecível.                    </p>
                </div>
                <SearchRoomHome />
            </div>
        </div>
    );
};

export default BannerHome;