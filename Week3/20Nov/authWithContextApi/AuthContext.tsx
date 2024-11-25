import React, { createContext, useState, ReactNode } from "react";

export interface User {
    id: number;
    name: string;
}

export interface AuthContextState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextState>({
    user: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (user: User) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
