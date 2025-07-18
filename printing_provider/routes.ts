/**
 * An array of routes that are publicly accessible without authentication.
 * @type {string[]}
 */
/**
 * An array of routes that are publicly accessible without authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/printing-provider/auth/new-verification",
    "/printing-provider/api/hono"
]

/**
 * An array of routes that require authentication.
 * @type {string[]}
*/
export const authRoutes = [
    "/printing-provider/auth/login",
    "/printing-provider/auth/register",
    "/printing-provider/auth/reset",
    "/printing-provider/auth/error",
    "/printing-provider/auth/new-password",
]

/**
 * The prefix for API authentication routes.
 * @type {string}
 */
export const apiAuthPrefix = "/printing-provider/api"
export const DEFAULT_LOGIN_REDIRECT="/printing-provider/"
