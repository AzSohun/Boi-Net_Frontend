import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthResponse } from "../types/auth";



interface AuthContextType {

    user: AuthResponse['user'] | null,
    accessToken: string | null,
    setAuth: (data: AuthResponse['user'], token: string) => void,
    clearAuth: () => void

}


const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<AuthContextType['user'] | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const setAuth = (newUser: AuthResponse['user'], token: string) => {
        setUser(newUser);
        setAccessToken(token)
    }

    const clearAuth = () => {
        setUser(null);
        setAccessToken(null)
    }

    return (

        <AuthContext.Provider value={{ user, accessToken, setAuth, clearAuth }}>
            {children}
        </AuthContext.Provider>

    )

}



export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be within an AuthProvider.")
    }

    return context;
}