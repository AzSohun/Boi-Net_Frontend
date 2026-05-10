import { axiosClient } from "../Api/axiosClient";
import type { UserDto, RoleValue } from "../types/auth";

export const userService = {
    getAllUsers: async (): Promise<UserDto[]> => {
        const response = await axiosClient.get<UserDto[]>("/user/all");
        return response.data;
    },

    updateUserRole: async (userId: string, role: RoleValue) => {
        const response = await axiosClient.put(`/user/update-role/${userId}`, { role });
        return response.data;
    },

    deleteUser: async (userId: string) => {
        const response = await axiosClient.delete(`/user/delete/${userId}`);
        return response.data;
    },

    blockUser: async (userId: string, isBlocked: boolean) => {
        const response = await axiosClient.put(`/user/block/${userId}`, { isBlocked });
        return response.data;
    }
};
