// import { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { LoginSchema } from "@/features/auth/schemas";
// import { getUserByEmail } from "@/features/auth/data/user";
// import Github from "next-auth/providers/github"
// import Google from "next-auth/providers/google"
// import bcrypt from "bcryptjs";
// export default {
//   providers: [
//     Github({
//         clientId: process.env.GITHUB_CLIENT_ID!,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//     Google({
//         clientId: process.env.GOOGLE_CLIENT_ID!,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);

//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;

//           const user = await getUserByEmail(email);
//           if (!user || !user.password) {
//             return null;
//           }
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (passwordMatch) return user;
//         }
//         return null;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;

import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/features/auth/schemas";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

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
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/authorize`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          const data = await response.json();
          if (response.ok) {
            return data.user;
          }

          return null;
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
