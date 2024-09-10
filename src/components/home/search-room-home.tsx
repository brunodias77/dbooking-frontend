"use client";
import React, { useRef, useState, FormEvent } from "react";
import Button from "../button";
import { useRouter } from "next/router"; // Importa useRouter


interface SearchRoomHomeProps { }

const DateInput: React.FC<{
    label: string;
    inputRef: React.RefObject<HTMLInputElement>;
    onFocus: () => void;
}> = ({ label, inputRef, onFocus }) => (
    <div className="flex flex-col gap-1 items-center my-1 justify-center">
        <span className="text-gray-500 text-xs">{label}</span>
        <div className="flex items-center justify-center gap-4">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M18 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H6C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V7C21 6.20435 20.6839 5.44129 20.1213 4.87868C19.5587 4.31607 18.7956 4 18 4ZM8 17C7.80222 17 7.60888 16.9414 7.44443 16.8315C7.27998 16.7216 7.15181 16.5654 7.07612 16.3827C7.00043 16.2 6.98063 15.9989 7.01921 15.8049C7.0578 15.6109 7.15304 15.4327 7.29289 15.2929C7.43275 15.153 7.61093 15.0578 7.80491 15.0192C7.99889 14.9806 8.19996 15.0004 8.38268 15.0761C8.56541 15.1518 8.72159 15.28 8.83147 15.4444C8.94135 15.6089 9 15.8022 9 16C9 16.2652 8.89464 16.5196 8.70711 16.7071C8.51957 16.8946 8.26522 17 8 17ZM16 17H12C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16C11 15.7348 11.1054 15.4804 11.2929 15.2929C11.4804 15.1054 11.7348 15 12 15H16C16.2652 15 16.5196 15.1054 16.7071 15.2929C16.8946 15.4804 17 15.7348 17 16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17ZM19 11H5V7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H18C18.2652 6 18.5196 6.10536 18.7071 6.29289C18.8946 6.48043 19 6.73478 19 7V11Z"
                    fill="#24AB70"
                />
            </svg>
            <input
                ref={inputRef}
                type="date"
                className="bg-gray-50 p-2 text-gray_800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                onFocus={onFocus}
            />
        </div>
    </div>
);

const SearchRoomHome: React.FC<SearchRoomHomeProps> = () => {
    const dateInputRefCheckIn = useRef<HTMLInputElement>(null);
    const dateInputRefCheckOut = useRef<HTMLInputElement>(null);
    const [numberOfGuest, setNumberOfGuest] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter(); // Cria uma instância do roteador


    const handleNumberOfGuest = (event: React.ChangeEvent<HTMLSelectElement>) =>
        setNumberOfGuest(Number(event.target.value));

    const handleFocusCheckIn = () => {
        dateInputRefCheckIn.current?.showPicker();
    };

    const handleFocusCheckOut = () => {
        dateInputRefCheckOut.current?.showPicker();
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true); // Inicia o carregamento

        const checkInDate = dateInputRefCheckIn.current?.value;
        const checkOutDate = dateInputRefCheckOut.current?.value;

        const requestData = {
            checkIn: checkInDate,
            checkOut: checkOutDate,
            numberOfGuest,
        };

        console.log(requestData);

        try {
            const response = await fetch(
                `http://localhost:8080/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuest=${numberOfGuest}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            console.log("Busca realizada com sucesso:", data);
            router.push('/search');
        } catch (error) {
            console.error("Erro ao buscar quartos:", error);
        } finally {
            setIsLoading(false); // Finaliza o carregamento
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="absolute bottom-[25%] left-0 grid grid-cols-1 md:grid-cols-4 gap-4 md:pl-6 bg-white drop-shadow-2xl z-40 rounded w-[90%]"
        >
            <DateInput
                label="Data de início"
                inputRef={dateInputRefCheckIn}
                onFocus={handleFocusCheckIn}
            />
            <DateInput
                label="Data de saída"
                inputRef={dateInputRefCheckOut}
                onFocus={handleFocusCheckOut}
            />
            <div className="flex flex-col gap-1 items-center my-1 justify-center">
                <span className="text-gray-500 text-xs">Número de hóspedes</span>
                <select
                    id="numberOfGuest"
                    value={numberOfGuest}
                    onChange={handleNumberOfGuest}
                    className="w-full  bg-gray-50 border border-gray-300 text-gray_800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center items-center">
                <Button
                    disabled={isLoading}
                    className={`${isLoading ? "bg-green-900" : "bg-gree_500 text-white"
                        } p-2 rounded-lg transition-colors duration-300`}
                >
                    {isLoading ? "Procurando..." : "Procurar"}
                </Button>
            </div>
        </form>
    );
};

export default SearchRoomHome;



// "use client";
// import React, { useRef, useState, FormEvent } from "react";
// import Button from "../button";

// interface SearchRoomHomeProps { }

// const DateInput: React.FC<{
//     label: string;
//     inputRef: React.RefObject<HTMLInputElement>;
//     onFocus: () => void;
// }> = ({ label, inputRef, onFocus }) => (
//     <div className="flex flex-col gap-1 items-center my-1 justify-center">
//         <span className="text-gray-500 text-xs">{label}</span>
//         <div className="flex items-center justify-center gap-4">
//             <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//             >
//                 <path
//                     d="M18 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H6C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V7C21 6.20435 20.6839 5.44129 20.1213 4.87868C19.5587 4.31607 18.7956 4 18 4ZM8 17C7.80222 17 7.60888 16.9414 7.44443 16.8315C7.27998 16.7216 7.15181 16.5654 7.07612 16.3827C7.00043 16.2 6.98063 15.9989 7.01921 15.8049C7.0578 15.6109 7.15304 15.4327 7.29289 15.2929C7.43275 15.153 7.61093 15.0578 7.80491 15.0192C7.99889 14.9806 8.19996 15.0004 8.38268 15.0761C8.56541 15.1518 8.72159 15.28 8.83147 15.4444C8.94135 15.6089 9 15.8022 9 16C9 16.2652 8.89464 16.5196 8.70711 16.7071C8.51957 16.8946 8.26522 17 8 17ZM16 17H12C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16C11 15.7348 11.1054 15.4804 11.2929 15.2929C11.4804 15.1054 11.7348 15 12 15H16C16.2652 15 16.5196 15.1054 16.7071 15.2929C16.8946 15.4804 17 15.7348 17 16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17ZM19 11H5V7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H18C18.2652 6 18.5196 6.10536 18.7071 6.29289C18.8946 6.48043 19 6.73478 19 7V11Z"
//                     fill="#24AB70"
//                 />
//             </svg>
//             <input
//                 ref={inputRef}
//                 type="date"
//                 className="bg-gray-50 p-2 text-gray_800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
//                 onFocus={onFocus}
//             />
//         </div>
//     </div>
// );

// const SearchRoomHome: React.FC<SearchRoomHomeProps> = () => {
//     const dateInputRefCheckIn = useRef<HTMLInputElement>(null);
//     const dateInputRefCheckOut = useRef<HTMLInputElement>(null);
//     const [numberOfGuest, setNumberOfGuest] = useState<number>(1);

//     const handleNumberOfGuest = (event: React.ChangeEvent<HTMLSelectElement>) =>
//         setNumberOfGuest(Number(event.target.value));

//     const handleFocusCheckIn = () => {
//         dateInputRefCheckIn.current?.showPicker();
//     };

//     const handleFocusCheckOut = () => {
//         dateInputRefCheckOut.current?.showPicker();
//     };

//     const handleSubmit = async (event: FormEvent) => {
//         event.preventDefault();
//         const checkInDate = dateInputRefCheckIn.current?.value;
//         const checkOutDate = dateInputRefCheckOut.current?.value;

//         const requestData = {
//             checkIn: checkInDate,
//             checkOut: checkOutDate,
//             numberOfGuest,
//         };

//         console.log(requestData);

//         try {
//             const response = await fetch(
//                 `http://localhost:8080/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuest=${numberOfGuest}`,
//                 {
//                     method: "GET",
//                     headers: { "Content-Type": "application/json" },
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }

//             const data = await response.json();
//             console.log("Busca realizada com sucesso:", data);
//         } catch (error) {
//             console.error("Erro ao buscar quartos:", error);
//         }
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="absolute bottom-[25%] left-0 grid grid-cols-1 md:grid-cols-4 gap-4 md:pl-6 bg-white drop-shadow-2xl z-40 rounded w-[90%]"
//         >
//             <DateInput
//                 label="Data de inicio"
//                 inputRef={dateInputRefCheckIn}
//                 onFocus={handleFocusCheckIn}
//             />
//             <DateInput
//                 label="Data de saída"
//                 inputRef={dateInputRefCheckOut}
//                 onFocus={handleFocusCheckOut}
//             />
//             <div className="flex flex-col gap-1 items-center my-1 justify-center">
//                 <span className="text-gray-500 text-xs">Número de hóspedes</span>
//                 <select
//                     id="numberOfGuest"
//                     value={numberOfGuest}
//                     onChange={handleNumberOfGuest}
//                     className="bg-gray-50 border border-gray-300 text-gray_800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
//                 >
//                     {[...Array(10)].map((_, i) => (
//                         <option key={i} value={i + 1}>
//                             {i + 1}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className="flex justify-center items-center">
//                 <Button label="Procurar"></Button>
//             </div>
//         </form>
//     );
// };

// export default SearchRoomHome;




// // "use client";
// // import React, { useRef, useState, FormEvent } from 'react';
// // import Button from '../button';

// // interface SearchRoomHomeProps {
// // }

// // const SearchRoomHome: React.FC<SearchRoomHomeProps> = () => {
// //     const dateInputRefCheckIn = useRef<HTMLInputElement>(null);
// //     const dateInputRefCheckOut = useRef<HTMLInputElement>(null);
// //     const [numberOfGuest, setNumberOfGuest] = useState<number>(1);

// //     const handleNumberOfGuest = (event: React.ChangeEvent<HTMLSelectElement>) => {
// //         setNumberOfGuest(Number(event.target.value));
// //     };

// //     const handleFocusCheckIn = () => {
// //         dateInputRefCheckIn.current?.showPicker();
// //     };

// //     const handleFocusCheckOut = () => {
// //         dateInputRefCheckOut.current?.showPicker();
// //     };

// //     const handleSubmit = async (event: FormEvent) => {
// //         event.preventDefault();

// //         const checkInDate = dateInputRefCheckIn.current?.value;
// //         const checkOutDate = dateInputRefCheckOut.current?.value;

// //         const requestData = {
// //             checkIn: checkInDate,
// //             checkOut: checkOutDate,
// //             numberOfGuest,
// //         };

// //         console.log(requestData);

// //         try {
// //             const response = await fetch(
// //                 `http://localhost:8080/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&numberOfGuest=${numberOfGuest}`,
// //                 {
// //                     method: 'GET',
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                     },
// //                 }
// //             );

// //             if (response.ok) {
// //                 const data = await response.json();
// //                 console.log(data);
// //                 console.log('Busca realizada com sucesso!');
// //             } else {
// //                 console.error('Erro ao buscar quartos:', response.statusText);
// //             }
// //         } catch (error) {
// //             console.error('Erro ao enviar requisição:', error);
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleSubmit} className='absolute bottom-[25%] lef-0 grid grid-cols-1 md:grid-cols-4  gap-4 md:pl-6  bg-white drop-shadow-2xl z-40 rounded w-[90%]'>
// //             <div className="flex flex-col gap-1 items-center my-1 justify-center">
// //                 <span className='text-gray-500 text-xs	'>Data de inicio</span>
// //                 <div className='flex items-center justify-center gap-4'>
// //                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                         <path d="M18 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H6C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V7C21 6.20435 20.6839 5.44129 20.1213 4.87868C19.5587 4.31607 18.7956 4 18 4ZM8 17C7.80222 17 7.60888 16.9414 7.44443 16.8315C7.27998 16.7216 7.15181 16.5654 7.07612 16.3827C7.00043 16.2 6.98063 15.9989 7.01921 15.8049C7.0578 15.6109 7.15304 15.4327 7.29289 15.2929C7.43275 15.153 7.61093 15.0578 7.80491 15.0192C7.99889 14.9806 8.19996 15.0004 8.38268 15.0761C8.56541 15.1518 8.72159 15.28 8.83147 15.4444C8.94135 15.6089 9 15.8022 9 16C9 16.2652 8.89464 16.5196 8.70711 16.7071C8.51957 16.8946 8.26522 17 8 17ZM16 17H12C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16C11 15.7348 11.1054 15.4804 11.2929 15.2929C11.4804 15.1054 11.7348 15 12 15H16C16.2652 15 16.5196 15.1054 16.7071 15.2929C16.8946 15.4804 17 15.7348 17 16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17ZM19 11H5V7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H18C18.2652 6 18.5196 6.10536 18.7071 6.29289C18.8946 6.48043 19 6.73478 19 7V11Z" fill="#24AB70" />
// //                     </svg>
// //                     <input
// //                         ref={dateInputRefCheckIn}
// //                         type="date"
// //                         className="bg-gray-50 p-2  text-gray_800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
// //                         onFocus={handleFocusCheckIn}
// //                     />
// //                 </div>
// //             </div>
// //             <div className="flex flex-col gap-1 items-center my-1 justify-center">
// //                 <span className='text-gray-500 text-xs	'>Data de fim</span>
// //                 <div className='flex items-center justify-center gap-4'>
// //                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                         <path d="M18 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H6C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V19C3 19.7956 3.31607 20.5587 3.87868 21.1213C4.44129 21.6839 5.20435 22 6 22H18C18.7956 22 19.5587 21.6839 20.1213 21.1213C20.6839 20.5587 21 19.7956 21 19V7C21 6.20435 20.6839 5.44129 20.1213 4.87868C19.5587 4.31607 18.7956 4 18 4ZM8 17C7.80222 17 7.60888 16.9414 7.44443 16.8315C7.27998 16.7216 7.15181 16.5654 7.07612 16.3827C7.00043 16.2 6.98063 15.9989 7.01921 15.8049C7.0578 15.6109 7.15304 15.4327 7.29289 15.2929C7.43275 15.153 7.61093 15.0578 7.80491 15.0192C7.99889 14.9806 8.19996 15.0004 8.38268 15.0761C8.56541 15.1518 8.72159 15.28 8.83147 15.4444C8.94135 15.6089 9 15.8022 9 16C9 16.2652 8.89464 16.5196 8.70711 16.7071C8.51957 16.8946 8.26522 17 8 17ZM16 17H12C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16C11 15.7348 11.1054 15.4804 11.2929 15.2929C11.4804 15.1054 11.7348 15 12 15H16C16.2652 15 16.5196 15.1054 16.7071 15.2929C16.8946 15.4804 17 15.7348 17 16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17ZM19 11H5V7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H18C18.2652 6 18.5196 6.10536 18.7071 6.29289C18.8946 6.48043 19 6.73478 19 7V11Z" fill="#24AB70" />
// //                     </svg>
// //                     <input
// //                         ref={dateInputRefCheckOut}
// //                         type="date"
// //                         className="bg-gray-50 p-2  text-gray_800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
// //                         onFocus={handleFocusCheckOut}
// //                     />
// //                 </div>
// //             </div>

// //             <div className="flex flex-col gap-1 items-center my-1 justify-center">
// //                 <span className='text-gray-500 text-xs	'>Selecione a quantidade de pessoas</span>
// //                 <div className="relative w-full  ">
// //                     <svg
// //                         xmlns="http://www.w3.org/2000/svg"
// //                         className="absolute top-0 bottom-0 w-5 h-5 my-auto text-green_500 right-3"
// //                         viewBox="0 0 20 20"
// //                         fill="currentColor"
// //                     >
// //                         <path
// //                             fillRule="evenodd"
// //                             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
// //                             clipRule="evenodd"
// //                         />
// //                     </svg>
// //                     <select
// //                         id="roomType"
// //                         value={numberOfGuest}
// //                         onChange={handleNumberOfGuest}
// //                         className="pl-[50%] w-full py-2text-sm text-gray-600 bg-white  rounded-lg  outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
// //                     >
// //                         <option value={1}>01</option>
// //                         <option value={2}>02</option>
// //                         <option value={3}>03</option>
// //                     </select>
// //                 </div>
// //             </div>


// //             <Button label='Buscar' className='rounded-tl-xl rounded-bl-xl md:w-full'>

// //             </Button>

// //         </form>
// //     );
// // };

// // export default SearchRoomHome;