export declare const getTwoFactorTokenByToken: (token: string) => Promise<{
    id: string;
    email: string;
    token: string;
    expires: Date;
} | null>;
export declare const getTwoFactorTokenByEmail: (email: string) => Promise<{
    id: string;
    email: string;
    token: string;
    expires: Date;
} | null>;
//# sourceMappingURL=two-factor-token.d.ts.map