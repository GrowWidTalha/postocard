import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import { auth } from "./auth"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes"

const redirectRoutes = [
  "/auth/register",
  "/auth/reset",
  "/auth/error",
  "/auth/new-password",
]

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || nextUrl.pathname.startsWith("/cards")
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isRedirectRoute = redirectRoutes.includes(nextUrl.pathname)

  // Always on the top
  if (isApiAuthRoute) {
    return null
  }
  // Always on second
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl))
  }
  if (isRedirectRoute) {
    return Response.redirect(new URL("/", nextUrl))
  }

  return null
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
