import { ErrorResponse } from "@/types";
import axios, { AxiosError } from "axios"

const urlAPI = import.meta.env.VITE_SERVER_URL

export const createAccount = async (userData: FormData)  => {
    try {
        console.log(userData)
        const response = await axios.post(`${urlAPI}/api/auth/register`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
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

export const checkAuth = () => {

}