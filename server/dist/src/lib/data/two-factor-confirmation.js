import { db } from "../db";
export const getTwoFactorConfirmationByUserId = async (userId) => {
    try {
        const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
            where: { userId: userId },
        });
        return twoFactorConfirmation;
    }
    catch {
        return null;
    }
};
