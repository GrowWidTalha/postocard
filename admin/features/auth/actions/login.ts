"use server";

import * as z from "zod";
import { LoginSchema } from "@/features/auth/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "../data/user";
import { getTwoFactorTokenByEmail } from "../data/two-factor-token";
import { generateTwoFactorToken, generateVerificationToken } from "../lib/tokens";
import { sendTwoFactorEmail, sendVerificationEmail } from "../lib/mail";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log("Starting login process with values:", values);

  // Validate incoming fields
  const validatedFields = LoginSchema.safeParse(values);
  console.log("Field validation result:", validatedFields);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, code } = validatedFields.data;

  // Fetch the user by email
  const existingUser = await getUserByEmail(email);
  console.log("Found user:", { ...existingUser, password: "[REDACTED]" });
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email doesn't exist" };
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return { error: "Invalid credentials" };
  }

  // If the email isn't verified, send a verification email
  console.log("Checking email verification status:", { emailVerified: existingUser.emailVerified });
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    console.log("Generated verification token:", { token: verificationToken.token });
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    return { success: "Confirmation email sent" };
  }

//   Restrict access to admins only
  console.log("Checking user role:", { role: existingUser.role });
  if (existingUser.role !== "ADMIN") {
    return { error: "Only admins can access this dashboard!" };
  }

  // Handle two-factor authentication if enabled
  console.log("Checking 2FA status:", {
    isTwoFactorEnabled: existingUser.isTwoFactorEnabled,
    hasCode: !!code
  });
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const token = await getTwoFactorTokenByEmail(existingUser.email);
      console.log("2FA token verification:", {
        tokenExists: !!token,
        tokenMatches: token?.token === code,
        tokenExpiry: token?.expires
      });
      if (!token) return { error: "Invalid code" };
      if (token.token !== code) return { error: "Invalid code!" };

      if (new Date(token.expires) < new Date()) {
        return { error: "Code Expired" };
      }
    } else {
      // Generate a new two-factor token and send it via email
      const twoFactorToken = await generateTwoFactorToken(email);
      console.log("Generated new 2FA token:", { token: twoFactorToken.token });
      await sendTwoFactorEmail(twoFactorToken.token, twoFactorToken.email);
      return { twoFactor: true };
    }
  }

  // Sign in using credentials
  console.log("Attempting credential sign in");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo:DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};
