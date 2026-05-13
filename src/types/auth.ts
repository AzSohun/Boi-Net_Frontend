import type { Book } from "./book";

export const Role = {
    SuperAdmin: 'SuperAdmin',
    Admin: 'Admin',
    User: 'User'
} as const;

export type RoleValue = string | number;

/**
 * Utility to check roles robustly against both strings ("SuperAdmin", "0") 
 * and numbers (0) while being case-insensitive.
 */
export const checkRole = (user: any, target: 'SuperAdmin' | 'Admin' | 'User'): boolean => {
    if (!user) return false;

    // Check all possible variants for maximum compatibility
    const role = user.userRole ?? user.UserRole ?? user.role ?? user.Role ?? (user as any).user_role;
    if (role === undefined || role === null) return false;

    const sRole = String(role).toLowerCase();

    if (target === 'SuperAdmin') {
        return sRole === 'superadmin' || sRole === '0';
    }
    if (target === 'Admin') {
        return sRole === 'admin' || sRole === '1';
    }
    if (target === 'User') {
        return sRole === 'user' || sRole === '2';
    }

    return false;
};

export const isManagementUser = (user: any): boolean => {
    return checkRole(user, 'SuperAdmin') || checkRole(user, 'Admin');
};

export interface RegistrationDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface UserDto {
    id: string;
    Id?: string;
    email: string;
    Email?: string;
    name: string;
    Name?: string;
    profilePhotoUrl: string;
    ProfilePhotoUrl?: string;
    profilePhotoId?: string;
    ProfilePhotoId?: string;
    dob?: string | null;
    Dob?: string | null;
    userRole: RoleValue;
    UserRole?: RoleValue;
    isBlocked?: boolean;
    IsBlocked?: boolean;
    wishlist: Book[];
}

export interface UserProfileResponseDto {
    id: string;
    Id?: string;
    email: string;
    Email?: string;
    name: string;
    Name?: string;
    profilePhotoUrl: string;
    ProfilePhotoUrl?: string;
    dob?: string | null;
    Dob?: string | null;
    userRole: RoleValue;
    UserRole?: RoleValue;
    isBlocked?: boolean;
    IsBlocked?: boolean;
    wishlist: Book[];
}

export interface UpdateUserDto {
    name?: string;
    dob?: string | null;
    profilePhoto?: File;
}

export interface AuthResponse {
    user: UserDto;
    accessToken: string;
}
