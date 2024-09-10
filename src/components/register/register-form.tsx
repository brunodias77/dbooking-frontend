'use client';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '../button';
import Input from '../input';
import ErrorMessage from '../error-message';
import { RegisterResponse } from '@/types/register-response';
import register from '@/actions/register';

function FormButton() {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled={pending} label='Enviando...' className='bg-green-500' />
            ) : (
                <Button label='Entrar' className='bg-green-500 w-full' />
            )}
        </>
    );
}

const RegisterForm: React.FC = () => {
    const [state, action] = useFormState(register, {
        ok: false,
        error: '',
        data: {} as RegisterResponse,
    });

    React.useEffect(() => {
        if (state.ok) window.location.href = '/login';
    }, [state.ok]);

    return (
        <form action={action} className="flex flex-col items-center justify-center gap-4">
            <Input label="FirstName" name="FirstName" type="text" placeholder='Nome' />
            <Input label="LastName" name="LastName" type="text" placeholder='sobrenome' />
            <Input label="Data de Nascimento" name="birthDate" type="date" placeholder='01/01/2024' />
            <Input label="Email" name="email" type="email" placeholder='example@gmail.com' />
            <Input label='Telefone' name='phone' type='tel' placeholder='(00) 00000-0000' />
            <Input label="Senha" name="password" type="password" placeholder='***********' />
            <ErrorMessage error={state.error} />
            <FormButton />
        </form>
    );
};

export default RegisterForm;