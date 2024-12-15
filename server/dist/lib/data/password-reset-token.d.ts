export declare const getPasswordRestTokenByToken: (token: string) => Promise<{
    id: string;
    email: string;
    token: string;
    expires: Date;
} | null>;
export declare const getPasswordRestTokenByEmail: (email: string) => Promise<{
    id: string;
    email: string;
    token: string;
    expires: Date;
} | null>;
//# sourceMappingURL=password-reset-token.d.ts.map