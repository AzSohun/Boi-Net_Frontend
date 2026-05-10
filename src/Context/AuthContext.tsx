import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthResponse } from "../types/auth";
import Cookies from "js-cookie";

interface AuthContextType {
    user: AuthResponse['user'] | null;
    accessToken: string | null;
    setAuth: (data: AuthResponse['user'], token: string) => void;
    clearAuth: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthResponse['user'] | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Try to recover session from cookies
        const savedToken = Cookies.get("accessToken");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
            setAccessToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const setAuth = (newUser: AuthResponse['user'], token: string) => {
        setUser(newUser);
        setAccessToken(token);

        // Save to cookies and localStorage
        Cookies.set("accessToken", token, { expires: 7 }); // 7 days
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const clearAuth = () => {
        setUser(null);
        setAccessToken(null);
        Cookies.remove("accessToken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, setAuth, clearAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be within an AuthProvider.");
    }

    return context;
};
