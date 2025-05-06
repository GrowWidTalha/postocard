// "use server"
// import { z } from "zod";
// import { NewPasswordSchema } from "../schemas";
// import { getPasswordRestTokenByToken } from "../data/password-reset-token";
// import { getUserByEmail } from "../data/user";
// import bcrypt from "bcryptjs"
// import { db } from "@/db";

// export const newPassword = async (
//   values: z.infer<typeof NewPasswordSchema>,
//   token: string | null
// ) => {
//     if(!token){
//         return {error: "Missing token"}
//     }

//     const validatedFields = NewPasswordSchema.safeParse(values)
//     if(!validatedFields.success){
//         return { error: "Invalid password"}
//     }

//     const {password} = validatedFields.data

//     const existingToken = await getPasswordRestTokenByToken(token)

//     if(!existingToken) return { error: "Invalid token"}
//     const hasExpired = new Date(existingToken.expires) < new Date()

//     if(hasExpired) return {error: "token has expired."}

//     const existingUser = await getUserByEmail(existingToken.email)

//     if(!existingUser) return { error: "user not found"}

//     const hashedPassword = await bcrypt.hash(password, 10)

//     await db.user.update({
//         where: { id: existingUser.id},
//         data: {
//             password: hashedPassword
//         }
//     })

//     await db.passwordResetToken.delete({
//         where: { id: existingToken.id}
//     })

//     return { success: "Password updated"}
// };

import { z } from "zod";
import { NewPasswordSchema } from "../schemas";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token: string | null
) => {
    if (!token) {
        return { error: "Missing token" }
    }

    const validatedFields = NewPasswordSchema.safeParse(values)
    if (!validatedFields.success) {
        return { error: "Invalid password" }
    }

    const { password } = validatedFields.data

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/new-password?token=${encodeURIComponent(token)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })

        })
        const data = await response.json();

        if (!response.ok) {
            return { error: data.error || "Something went wrong" };
        }

        return { success: data.message || "Password changed successfully." };

    } catch (error) {
        console.error('Error in new verification:', error);
        return { error: "Something went wrong" };
    }
};

