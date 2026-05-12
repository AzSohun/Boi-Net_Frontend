import axios from "axios";
import { useNavigate } from "react-router-dom";



const BASE_URL = import.meta.env.VITE_API_URL || "https://localhost:7293/api";
const navigate = useNavigate();

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})


axiosClient.interceptors.request.use((config) => {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1];

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to handle errors globally
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Authentication failed. Please Login");
            navigate("/login");
        }
        return Promise.reject(error);
    }
);
