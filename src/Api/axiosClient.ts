import axios from "axios";



const BASE_URL = "https://localhost:7293/api";


export const axiosClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})


axiosClient.interceptors.response.use(
    (response) => { return response },
    (error) => {

        if (error.response && error.response.status === 401) {
            console.error("Authentication failed. Please Login")
        }
        return Promise.reject(error);
    }
);