/**
 * An array of routes that are publicly accessible without authentication.
 * @type {string[]}
 */
/**
 * An array of routes that are publicly accessible without authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/auth/new-verification",
    "/api/hono",
    "/",
    "/cards",
    "/cards/*", // Matches any route starting with /cards/
    "/design",
    "/blog",
    "/cart",
    "/checkout",
    "/contact",
    "/faq",
    "/privacypolicy",
    "/shippingpolicy",
    "/returnpolicy"
]

/**
 * An array of routes that require authentication.
 * @type {string[]}
*/
export const authRoutes = [
    "/auth/login",
]

/**
 * The prefix for API authentication routes.
 * @type {string}
 */
export const apiAuthPrefix = "/api"
export const DEFAULT_LOGIN_REDIRECT="/"
