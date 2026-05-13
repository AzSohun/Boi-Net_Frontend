import { axiosClient } from "../Api/axiosClient";
import type { AuthResponse, LoginDto, RegistrationDto } from "../types/auth";

// Registration
export const registerUser = async (data: RegistrationDto) => {
    const response = await axiosClient.post("/Auth/register", data);
    return response.data;
};

// Login
export const loginUser = async (data: LoginDto): Promise<AuthResponse> => {
    const response = await axiosClient.post("/Auth/login", data);
    return response.data;
};
