
export type LoaderProps = {
    message?: string;
    showLogo?: boolean;
  };

export interface CreateAcc {
    name: string;
    email: string;
    password: string;
    role: string;
    image: string

}

export interface User extends CreateAcc{
    id: string;
}

export interface ErrorResponse {
    error: string;
    errors?: Record<string, string[]>;
}
