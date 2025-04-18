import { NextFunction, Request, Response } from 'express';
import { decrypt } from '../utils/jwe'; 


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'No token provided. Authorization denied.' });
    }

    try {
        const decoded = await decrypt(token);
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token. Authorization denied.' });
    }
};
