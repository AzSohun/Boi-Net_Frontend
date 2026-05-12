import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../Api/axiosClient';
import { useAuth } from '../../Context/AuthContext';

export const AxiosInterceptor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { clearAuth } = useAuth();

    useEffect(() => {
        // This interceptor will handle 401s and redirect to login
        const interceptor = axiosClient.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    // 1. Clear local session state
                    clearAuth();

                    // 2. Redirect to login without page reload
                    if (window.location.pathname !== '/login') {
                        navigate('/login');
                    }
                }
                return Promise.reject(error);
            }
        );

        // Clean up interceptor on unmount
        return () => {
            axiosClient.interceptors.response.eject(interceptor);
        };
    }, [navigate, clearAuth]);

    return <>{children}</>;
};
