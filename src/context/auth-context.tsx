import React, { createContext, useContext, useState, ReactNode } from 'react';

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
    getUserEmail: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<LoginResponse | null>(null);

    const handleLogin = (user: LoginResponse) => {
        console.log("Estou no handleLogin");
        console.log(user);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userRoles", JSON.stringify(user.roles));
        localStorage.setItem("token", user.token);
        setUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRoles");
        localStorage.removeItem("token");
        setUser(null);
    };

    const getUserEmail = () => {
        return localStorage.getItem("userEmail");
    }

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
