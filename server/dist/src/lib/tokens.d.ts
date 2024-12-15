export declare const generateTwoFactorToken: (email: string) => Promise<{
    id: string;
    email: string;
    token: string;
    expires: Date;
}>;
export declare const generateVerificationToken: (email: string) => Promise<{
    id: string;
    email: string;
    token: string;
    expires: Date;
}>;
export declare const generatePasswordResetToken: (email: string) => Promise<{
    id: string;
    email: string;
    token: string;
    expires: Date;
}>;
//# sourceMappingURL=tokens.d.ts.map