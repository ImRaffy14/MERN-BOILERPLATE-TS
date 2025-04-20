import prisma from "../config/prisma";
import { AppError } from "../utils/appError";
import { User } from "../types";

export const getUserService = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: {
                select: {
                    imageUrl: true,
                    publicId: true,
                },
            },
        },
    });

    return users;
}