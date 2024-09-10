/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { cookies } from 'next/headers';
// import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface LoginResponse {
    email: string;
    token: string;
    type: string; // "Bearer"
    roles: string[]; // Ex: ["ROLE_ADMIN"]
}

interface AuthContextType {
    user: LoginResponse | null;
    handleLogin: (user: LoginResponse) => void;
    handleLogout: () => void;
    getUserEmail: () => any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<LoginResponse | null>(null);

    const handleLogin = (user: LoginResponse) => {
        console.log("Estou no handleLogin");
        console.log(user);
        cookies().set("userEmail", user.email, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
        });
        cookies().set("userRoles", JSON.stringify(user.roles), {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
        });
        cookies().set("token", user.token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
        });
        setUser(user);
    };

    const handleLogout = () => {
        cookies().delete("userEmail");
        cookies().delete("userRoles");
        cookies().delete("token");
        setUser(null);
    };

    const getUserEmail = () => {
        const email = cookies().get("userEmail");
        return email;
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, getUserEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};