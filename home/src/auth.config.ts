import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs";
import { LoginSchema } from "./features/auth/schemas";
import { getUserByEmail } from "./features/auth/data/user";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
