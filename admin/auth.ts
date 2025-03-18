import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import { getUserById } from "@/features/auth/data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/features/auth/data/two-factor-confirmation";
import { getAccountByUserId } from "@/features/auth/data/account";

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
        // verifyRequest: "/auth/verify-request"
    },
    adapter: PrismaAdapter(db),
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    emailVerified: new Date(),
                },
            });
        },
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            console.log("Starting signIn callback with:", { userId: user.id, provider: account?.provider });

            if (account?.provider !== "credentials") {
                console.log("Non-credentials provider, allowing sign in");
                return true;
            }

            console.log("Fetching existing user from database");
            const existingUser = await getUserById(user.id!);
            console.log("Found user:", existingUser);

            if (!existingUser || !existingUser.emailVerified) {
                console.log("User validation failed:", { exists: !!existingUser, emailVerified: existingUser?.emailVerified });
                return false;
            }

            if (existingUser.isTwoFactorEnabled) {
                console.log("2FA is enabled, checking for confirmation");
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
                    existingUser.id
                );
                console.log("2FA confirmation status:", { exists: !!twoFactorConfirmation });

                if (!twoFactorConfirmation) {
                    console.log("No 2FA confirmation found, denying access");
                    return false;
                }

                console.log("Deleting used 2FA confirmation");
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id },
                });
            }
            await db.twoFactorConfirmation.create({
                data: {
                  userId: user?.id!,
                },
              });

            console.log("All checks passed, allowing sign in");
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email ?? '';
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            return token;
        },
    },
    session: { strategy: "jwt" },
    ...authConfig,
    secret: process.env.AUTH_SECRET, // Ensure the secret is set correctly
});
