import * as z from "zod";
import { LoginSchema, RegisterSchema, ResetSchema, NewPasswordSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { getTwoFactorTokenByEmail } from "../data/two-factor-token";
import { generatePasswordResetToken, generateTwoFactorToken, generateVerificationToken } from "../lib/tokens";
import { sendPasswordResetToken, sendTwoFactorEmail, sendVerificationEmail } from "../lib/mail";
import { getVerificationTokenByToken } from "../data/verification-token";
import { getPasswordRestTokenByToken } from "../data/password-reset-token";
import bcrypt from "bcryptjs";
import { db } from "../db";

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

  // Restrict access to admins only
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

  // Return success response with user data (excluding sensitive information)
  return {
    success: true,
    user: {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      role: existingUser.role,
      isTwoFactorEnabled: existingUser.isTwoFactorEnabled
    }
  };
};


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: "Email already taken." };
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationtoken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationtoken.email,
      verificationtoken.token,
    );
    await db.twoFactorConfirmation.create({
      data: {
        userId: user.id,
      },
    });
    return { success: "Confirmation email sent!" };
  };

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) return { error: "Token does not exist." };

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) return { error: "Token expired" };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: "Email does not exist" };

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Email verified successfully" };
  } catch (error) {
    console.log("Error in new verification", error);
    return { error: "Something went wrong" };
  }
};

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Email!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found." };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetToken(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent." };
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid password" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordRestTokenByToken(token);
  if (!existingToken) return { error: "Invalid token" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired." };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "User not found" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated" };
};
