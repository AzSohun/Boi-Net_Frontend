import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";
import type { AuthResponse } from "../types/auth";

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
        const savedUser = Cookies.get("user");

        if (savedToken && savedUser) {
            setAccessToken(savedToken);
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse user from cookie", e);
                Cookies.remove("user");
            }
        }
        setIsLoading(false);
    }, []);

    const setAuth = (newUser: AuthResponse['user'], token: string) => {
        setUser(newUser);
        setAccessToken(token);

        // Save to cookies ONLY - 100% avoid localStorage for security
        Cookies.set("accessToken", token, { expires: 7, sameSite: 'lax' });
        Cookies.set("user", JSON.stringify(newUser), { expires: 7, sameSite: 'lax' });
    };

    const clearAuth = () => {
        setUser(null);
        setAccessToken(null);
        Cookies.remove("accessToken");
        Cookies.remove("user");
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
