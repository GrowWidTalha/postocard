// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "@/db";
// import { getUserById } from "@/features/auth/data/user";
// import { UserRole } from "@prisma/client";
// import { getTwoFactorConfirmationByUserId } from "@/features/auth/data/two-factor-confirmation";
// import { getAccountByUserId } from "@/features/auth/data/account";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/error",
//     // verifyRequest: "/auth/verify-request"
//   },
//   adapter: PrismaAdapter(db),
//   events: {
//     async linkAccount({ user }) {
//       await db.user.update({
//         where: {
//           id: user.id,
//         },
//         data: {
//           emailVerified: new Date(),
//         },
//       });
//     },
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider !== "credentials") return true;
//       const existingUser = await getUserById(user.id!);
//       if (!existingUser || !existingUser.emailVerified) {
//         return false;
//       }

//       if (existingUser.isTwoFactorEnabled) {
//         const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
//           existingUser.id
//         );
//         if (!twoFactorConfirmation) return false;

//         await db.twoFactorConfirmation.delete({
//           where: { id: twoFactorConfirmation.id },
//         });
//       }

//       await db.twoFactorConfirmation.create({
//         data: {
//           userId: user?.id!,
//         },
//       });

//       return true;
//     },
//     async session({ token, session }) {
//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//       }

//       if (token.role && session.user) {
//         session.user.role = token.role as UserRole;
//       }

//       if (session.user) {
//         session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
//       }

//       if (session.user) {
//         session.user.name = token.name;
//         session.user.email = token.email ?? '';
//         session.user.isOAuth = token.isOAuth as boolean;
//       }

//       return session;
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token;

//       const existingUser = await getUserById(token.sub);

//       if (!existingUser) return token;

//       const existingAccount = await getAccountByUserId(existingUser.id);

//       token.isOAuth = !! existingAccount;
//       token.name = existingUser.name;
//       token.email = existingUser.email;
//       token.role = existingUser.role;
//       token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

//       return token;
//     },
//   },
//   session: { strategy: "jwt" },
//   ...authConfig,
//   secret: process.env.AUTH_SECRET, // Ensure the secret is set correctly
// });

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
