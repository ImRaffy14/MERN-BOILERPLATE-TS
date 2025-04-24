
export type LoaderProps = {
    message?: string;
    showLogo?: boolean;
};

export interface CreateAcc {
    name: string;
    email: string;
    password: string;
    role: string;
    image: File

}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image: {
        imageUrl: string;
        publicId: string;
    }
}

export interface UsersResponse {
    status: 'success';
    data: User[];
}

export interface ErrorResponse {
    error: string;
    errors?: Record<string, string[]>;
}

