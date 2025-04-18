import bcrypt from 'bcryptjs';
import { encrypt, decrypt } from '../utils/jwe';
import  prisma  from '../config/prisma';
import { RegisterUser } from '../types/auth';
import { UserRole } from '@prisma/client';
import { AppError } from '../utils/appError';

export const registerService = async (data: RegisterUser) => {
    const { name, email, password, role } = data;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: role as UserRole,
        },
    });

    return user;

}