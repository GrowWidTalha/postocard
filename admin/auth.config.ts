import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/features/auth/schemas";
import { getUserByEmail } from "@/features/auth/data/user";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs";
export default {
  providers: [
    Github({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        console.log("Starting authorize with credentials:", { ...credentials, password: "[REDACTED]" });

        const validatedFields = LoginSchema.safeParse(credentials);
        console.log("Field validation result:", validatedFields);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          console.log("Attempting to find user with email:", email);

          const user = await getUserByEmail(email);
          console.log("Found user:", { ...user, password: "[REDACTED]" });

          if (!user || !user.password) {
            console.log("User validation failed:", { exists: !!user, hasPassword: !!user?.password });
            return null;
          }

          console.log("Comparing passwords");
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log("Password match result:", passwordMatch);

          if (passwordMatch) {
            console.log("Password matched, returning user");
            return user;
          }
        }
        console.log("Authorization failed, returning null");
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
