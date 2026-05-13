import { axiosClient } from "../Api/axiosClient";
import type { UserDto, RoleValue } from "../types/auth";

export const userService = {
    getAllUsers: async (): Promise<UserDto[]> => {
        const response = await axiosClient.get<any>("/User/all");
        return response.data;
    },

    updateUserRole: async (userId: string, role: RoleValue) => {
        const response = await axiosClient.put(`/User/update-role/${userId}`, { role });
        return response.data;
    },

    deleteUser: async (userId: string) => {
        const response = await axiosClient.delete(`/User/delete/${userId}`);
        return response.data;
    },

    blockUser: async (userId: string, isBlocked: boolean) => {
        const response = await axiosClient.put(`/User/block/${userId}`, { isBlocked });
        return response.data;
    },

    // Get Profile
    getProfile: async (): Promise<UserDto> => {
        const response = await axiosClient.get("/User/me");
        return response.data;
    },

    // 1. Update Profile (FormData: Name, DOB, ProfilePhoto)
    updateProfile: async (formData: FormData): Promise<UserDto> => {
        const response = await axiosClient.put("/User/me", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // 2. Delete Account (Soft Delete)
    deleteMe: async () => {
        const response = await axiosClient.delete("/User/me");
        return response.data;
    },

    // 3. Admin: Manage User (Role/Block)
    adminManageUser: async (userId: string, data: { UserRole: string, IsBlocked: boolean }) => {
        const response = await axiosClient.put(`/User/admin/manage-user/${userId}`, data);
        return response.data;
    }
};
