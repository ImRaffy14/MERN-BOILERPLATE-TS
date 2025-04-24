import { CreateAcc, User, ErrorResponse } from "@/types";
import axios, { AxiosError } from "axios"

const urlAPI = import.meta.env.VITE_SERVER_URL

export const createAccount = async (userData: CreateAcc): Promise<User>  => {
    try {
        const response = await axios.post<User>(`${urlAPI}/api/auth/register`, userData)
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>

        if(axiosError.response){
            throw new Error(axiosError.response?.data.error)
        }
        else if (axiosError.request) {
            throw new Error('Network error - no response from server');
        } 
        else {
            throw new Error('Request failed to be created');
        }
    }
}