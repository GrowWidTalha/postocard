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
