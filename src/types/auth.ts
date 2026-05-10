
export const Role = {
    SuperAdmin: 0,
    Admin: 1,
    User: 2
} as const;

export type RoleValue = (typeof Role)[keyof typeof Role];

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
    email: string;
    name: string;
    profilePhotoUrl: string;
    profilePhotoId?: string;
    dob?: string | null;
    userRole: RoleValue;
    wishlist: any[];
}

export interface AuthResponse {
    user: UserDto;
    accessToken: string;
}
