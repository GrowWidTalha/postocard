declare const client: {
    api: {
        v1: {
            auth: {
                getUserByEmail: {
                    ":email": import("hono/client").ClientRequest<{
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
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            auth: {
                getUserById: {
                    ":id": import("hono/client").ClientRequest<{
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
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            auth: {
                createUser: import("hono/client").ClientRequest<{
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
                }>;
            };
        };
    };
} & {
    api: {
        v1: {
            auth: {
                generateVerificationToken: {
                    ":email": import("hono/client").ClientRequest<{
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
                    }>;
                };
            };
        };
    };
} & {
    api: {
        v1: {
            auth: {
                validateNewVerification: {
                    ":token": import("hono/client").ClientRequest<{
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
                    }>;
                };
            };
        };
    };
};
export type Client = typeof client;
export declare const hcWithType: (baseUrl: string, options?: import("hono/client").ClientRequestOptions | undefined) => Client;
export {};
//# sourceMappingURL=hc.d.ts.map