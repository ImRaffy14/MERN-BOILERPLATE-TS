import { Request, Response } from 'express';
import { registerService } from '../services/authService';
import { asyncHandler } from '../utils/asyncHandler';

export const registerUser = asyncHandler( async ( req: Request, res: Response) => {
    const userRegistered = await registerService(req.body);
    res.status(201).json({
        status: 'success',
        message: `User ${userRegistered.name} registered successfully`,
        user: userRegistered,
    });
})