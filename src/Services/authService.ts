import { axiosClient } from "../Api/axiosClient";
import type { AuthResponse, LoginDto, RegistrationDto } from "../types/auth";
import { unwrap } from "../lib/api-utils";

// Registration
export const registerUser = async (data: RegistrationDto) => {
    const response = await axiosClient.post("/Auth/register", data);
    return unwrap(response.data);
};

// Login
export const loginUser = async (data: LoginDto): Promise<AuthResponse> => {
    const response = await axiosClient.post("/Auth/login", data);
    return unwrap<AuthResponse>(response.data);
};
