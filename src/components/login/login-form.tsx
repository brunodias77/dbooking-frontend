'use client';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '../button';
import { login } from '@/actions/login';
import React from 'react';
import Input from '../input';
import ErrorMessage from '../error-message';


export default function LoginForm() {
    const [state, action] = useFormState(login, {
        ok: false,
        error: '',
        data: null,
    });
    React.useEffect(() => {
        if (state.ok) window.location.href = '/';
    }, [state.ok]);

    return (
        <form action={action} className="">
            <Input label="Email" name="email" type="email" />
            <Input label="Senha" name="password" type="password" />
            <ErrorMessage error={state.error} />
            <FormButton />
        </form>

    );
}

function FormButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled={pending} label='Enviando...' className='bg-green-500' />
            ) : (
                <Button label='Entrar' className='bg-green-500' />
            )}
        </>
    )
}