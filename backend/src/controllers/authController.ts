import { Request, Response } from 'express';
import { registerService, loginService } from '../services/authService';
import { asyncHandler } from '../utils/asyncHandler';

export const registerUser = asyncHandler( async ( req: Request, res: Response) => {
    const userRegistered = await registerService(req.body);
    res.status(201).json({
        status: 'success',
        message: `User ${userRegistered.name} registered successfully`,
        user: userRegistered,
    });
})

export const loginUser = asyncHandler( async ( req: Request, res: Response) => {
    const userLoggedIn = await loginService(req.body);
    res.cookie('accessToken', userLoggedIn.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
        status: 'success',
        message: 'Logged in successfully',
    })
})

export const getUserProfile = asyncHandler( async ( req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        user: req.user,
    })
})

export const logoutUser = asyncHandler( async ( req: Request, res: Response) => {
    res.clearCookie('accessToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    .status(200)
    .json({
        status: 'success',
        message: 'Logged out successfully',
    })
})