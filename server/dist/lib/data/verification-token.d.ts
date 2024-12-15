export declare const getVerificationTokenByEmail: (email: string) => Promise<{
    id: string;
    email: string;
    token: string;
    expires: Date;
} | null | undefined>;
export declare const getVerificationTokenByToken: (token: string) => Promise<{
    id: string;
    email: string;
    token: string;
    expires: Date;
} | null | undefined>;
//# sourceMappingURL=verification-token.d.ts.map