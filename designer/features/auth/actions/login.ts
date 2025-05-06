// "use server";

// import * as z from "zod";
// import { LoginSchema } from "@/features/auth/schemas";
// import { signIn } from "@/auth";
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import AuthError from "next-auth";
// import { getUserByEmail } from "../data/user";
// import { getTwoFactorTokenByEmail } from "../data/two-factor-token";
// import {
//   generateTwoFactorToken,
//   generateVerificationToken,
// } from "../lib/tokens";
// import { sendTwoFactorEmail, sendVerificationEmail } from "../lib/mail";
// import { db } from "@/db";
// import { getTwoFactorConfirmationByUserId } from "../data/two-factor-confirmation";
// import { compare } from "bcryptjs"; // Import compare function from bcryptjs
// export const login = async (values: z.infer<typeof LoginSchema>) => {
//   const validatedFields = LoginSchema.safeParse(values);
//   if (!validatedFields.success) {
//     return { error: "Invalid fields" };
//   }
//   const { email, password, code } = validatedFields.data;
//   const existingUser = await getUserByEmail(email);
//   console.log(existingUser)
//   if (!existingUser || !existingUser.email || !existingUser.password) {
//     return { error: "Email doesn't exist" };
//   }

//   // Verify password
//   const isPasswordValid = await compare(password, existingUser.password);
//   if (!isPasswordValid) {
//     return { error: "Invalid Credentials" };
//   }

//   if (!existingUser.emailVerified) {
//     const verificationToken = await generateVerificationToken(
//       existingUser.email
//     );
//     await sendVerificationEmail(
//       verificationToken.email,
//       verificationToken.token
//     );
//     return { success: "Confirmation email sent" };
//   }

//   const isAdmin = existingUser.role === "DESIGNER";

//   if(!isAdmin) {
//     return { error: "Only designers can access this dashboard!"}
//   }

//   if (existingUser.isTwoFactorEnabled && existingUser.email) {
//     if (code) {
//       const token = await getTwoFactorTokenByEmail(existingUser.email);
//       if (!token) return { error: "Invalid code" };

//       if (token.token !== code) return { error: "Invalid code!" };

//       const hasExpired = new Date(token.expires) < new Date();

//       if (hasExpired) return { error: "Code Expired" };

//       await db.twoFactorToken.delete({ where: { id: token.id } });

//       const existingTwoFactorConfirmation =
//         await getTwoFactorConfirmationByUserId(existingUser.id);

//       if (existingTwoFactorConfirmation) {
//         await db.twoFactorConfirmation.delete({
//           where: { id: existingTwoFactorConfirmation.id },
//         });
//       }

//       await db.twoFactorConfirmation.create({
//         data: {
//           userId: existingUser.id,
//         },
//       });
//     } else {
//       const twoFactorToken = await generateTwoFactorToken(email);
//       console.log(twoFactorToken.token);
//       const email2 = await sendTwoFactorEmail(twoFactorToken.token, twoFactorToken.email);
//       console.log(email2);
//       return { twoFactor: true };
//     }
//   }

//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo: DEFAULT_LOGIN_REDIRECT,
//     });
//     return { success: "success" };
//   } catch (error: any) {
//       console.log(error)
//     if (error instanceof AuthError){
//         // @ts-ignore
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: "Invalid Credentials" };
//           break;
//         default:
//           return { error: "Something Went Wrong" };
//       }
//     }
//     throw error;
//   }
// };
import * as z from "zod";
import { LoginSchema } from "@/features/auth/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("[LOGIN-ACTION] Backend error:", data.error);
      return { error: data.error || "Something went wrong" };
    }

    if (data.twoFactor) {
      return { twoFactor: true };
    }

    return { success: data.message || "Login successful" };

  } catch (error) {
    console.error("[LOGIN-ACTION] Unexpected error:", error);
    return { error: "Something went wrong" };
  }
};
