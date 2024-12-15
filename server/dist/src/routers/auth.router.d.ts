declare const authRouter: import("hono/hono-base").HonoBase<import("hono/types").BlankEnv, {
    "/getUserByEmail/:email": {
        $get: {
            input: {
                param: {
                    email: string;
                };
            };
            output: {
                status: string;
                message: string;
                data: null;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    email: string;
                };
            };
            output: {
                status: string;
                message: string;
                data: {
                    user: {
                        id: string;
                        email: string | null;
                        name: string | null;
                        emailVerified: string | null;
                        image: string | null;
                        password: string | null;
                        role: import("@prisma/client").$Enums.UserRole;
                        isTwoFactorEnabled: boolean;
                    };
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
} & {
    "/getUserById/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                status: string;
                message: string;
                data: null;
            };
            outputFormat: "json";
            status: 404;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {
                status: string;
                message: string;
                data: {
                    user: {
                        id: string;
                        email: string | null;
                        name: string | null;
                        emailVerified: string | null;
                        image: string | null;
                        password: string | null;
                        role: import("@prisma/client").$Enums.UserRole;
                        isTwoFactorEnabled: boolean;
                    };
                };
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
} & {
    "/createUser": {
        $post: {
            input: {
                form: {
                    email: string;
                    name: string;
                    password: string;
                    role: "USER" | "ADMIN";
                };
            };
            output: {
                status: string;
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
} & {
    "/generateVerificationToken/:email": {
        $post: {
            input: {
                param: {
                    email: string;
                };
            };
            output: {
                status: string;
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
} & {
    "/validateNewVerification/:token": {
        $get: {
            input: {
                param: {
                    token: string;
                };
            };
            output: {
                status: string;
                message: string;
            };
            outputFormat: "json";
            status: import("hono/utils/http-status").StatusCode;
        };
    };
}, "/">;
export default authRouter;
//# sourceMappingURL=auth.router.d.ts.map