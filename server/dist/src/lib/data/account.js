import { db } from "../db";
export const getAccountByUserId = async (userId) => {
    try {
        const account = await db.account.findFirst({
            where: { userId: userId }
        });
        return account;
    }
    catch {
        return null;
    }
};
