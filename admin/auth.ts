import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    adapter: PrismaAdapter(db),
    events: {
        async linkAccount({ user }) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/link-account`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user }),
                });
                const data = await response.json();
                if (!data.success) {
                    throw new Error('Failed to link account');
                }
            } catch (error) {
                console.error('Link account error:', error);
                throw error;
            }
        },
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signin-callback`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user, account }),
                });
                const data = await response.json();
                return data.success;
            } catch (error) {
                console.error('[AUTH] SignIn callback error:', error);
                return false;
            }
        },
        async session({ token, session }) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token, session }),
                });
                const data = await response.json();
                return data.session;
            } catch (error) {
                console.error('[AUTH] Session callback error:', error);
                return session;
            }
        },
        async jwt({ token }) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/jwt`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });
                const data = await response.json();
                return data.token;
            } catch (error) {
                console.error('JWT callback error:', error);
                return token;
            }
        },
    },
    session: { strategy: "jwt" },
    ...authConfig,
    secret: process.env.AUTH_SECRET,
});
