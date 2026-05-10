


export interface RegistrationDto {

    name: string,
    email: string,
    password: string

}



export interface LoginDto {

    email: string,
    password: string

}


export interface AuthResponse {

    user: {
        id: number,
        name: string,
        email: string,
        role: string
    },
    accessToken: string

}





