'use client';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '../button';
import { login } from '@/actions/login';
import React from 'react';
import Input from '../input';
import ErrorMessage from '../error-message';
import { LoginResponse } from '../../types/login-response';

export default function LoginForm() {
    const [state, action] = useFormState(login, {
        ok: false,
        error: '',
        data: {} as LoginResponse,
    });
    React.useEffect(() => {
        if (state.ok) window.location.href = '/';
    }, [state.ok]);

    return (
        <form action={action} className=" flex flex-col items-center justify-center gap-4">
            <Input label="Email" name="email" type="email" placeholder='example@gmail.com' />
            <Input label="Senha" name="password" type="password" placeholder='***********' />
            <ErrorMessage error={state.error} />
            <FormButton />
        </form>
    );
}

function FormButton() {
    const { pending } = useFormStatus();
    return (
        <Button className='bg-green-500 w-full'>
            {pending ? "Enviando..." : "Enviar"}
        </Button>
        // <>
        //     {pending ? (
        //         <Button disabled={pending} label='Enviando...' className='bg-green-500 w-full' />
        //     ) : (
        //         <Button label='Entrar' className='bg-green-500 w-full' />
        //     )}
        // </>
    )
}