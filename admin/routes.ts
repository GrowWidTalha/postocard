/**
 * An array of routes that are publicly accessible without authentication.
 * @type {string[]}
 */
/**
 * An array of routes that are publicly accessible without authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/admin/auth/new-verification",
    "/admin/api/hono"
]

/**
 * An array of routes that require authentication.
 * @type {string[]}
*/
export const authRoutes = [
    "/admin/auth/login",
    "/admin/auth/register",
    "/admin/auth/reset",
    "/admin/auth/error",
    "/admin/auth/new-password",

]

/**
 * The prefix for API authentication routes.
 * @type {string}
 */
export const apiAuthPrefix = "/admin/api"
export const DEFAULT_LOGIN_REDIRECT="/admin/"
