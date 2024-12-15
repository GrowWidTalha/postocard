export declare const getUserByEmail: (email: string) => Promise<{
    id: string;
    email: string | null;
    name: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: import("@prisma/client").$Enums.UserRole;
    isTwoFactorEnabled: boolean;
} | null>;
export declare const getUserById: (id: string) => Promise<{
    id: string;
    email: string | null;
    name: string | null;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    role: import("@prisma/client").$Enums.UserRole;
    isTwoFactorEnabled: boolean;
} | null>;
//# sourceMappingURL=user.d.ts.map