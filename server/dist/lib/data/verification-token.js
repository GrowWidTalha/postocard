import { db } from "../db";
export const getVerificationTokenByEmail = async (email) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email: email }
        });
        return verificationToken;
    }
    catch (error) {
        console.log('Error while getting email verification token: ', error);
    }
};
export const getVerificationTokenByToken = async (token) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { token }
        });
        return verificationToken;
    }
    catch (error) {
        console.log('Error while getting email verification token: ', error);
    }
};
