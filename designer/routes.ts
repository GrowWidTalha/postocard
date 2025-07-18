/**
 * An array of routes that are publicly accessible without authentication.
 * @type {string[]}
 */
/**
 * An array of routes that are publicly accessible without authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/designer/auth/new-verification",
    "/designer/api/hono"
]

/**
 * An array of routes that require authentication.
 * @type {string[]}
*/
export const authRoutes = [
    "/designer/auth/login",
    "/designer/auth/register",
    "/designer/auth/reset",
    "/designer/auth/error",
    "/designer/auth/new-password",
]

/**
 * The prefix for API authentication routes.
 * @type {string}
 */
export const apiAuthPrefix = "/designer/api"
export const DEFAULT_LOGIN_REDIRECT="/designer/"
