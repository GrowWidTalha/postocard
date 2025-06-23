import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

// Helper function to check if a URL is an auth route
const isAuthRouteUrl = (url: string) => {
  try {
    const pathname = new URL(url).pathname;
    return authRoutes.some(route => pathname.startsWith(route));
  } catch {
    return false;
  }
};

// Helper function to check if a path matches any auth route
const isAuthRoute = (pathname: string) => {
  // Remove trailing slash for consistent comparison
  const normalizedPath = pathname.replace(/\/$/, '');
  return authRoutes.some(route => normalizedPath === route);
};

// @ts-ignore 
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log("isLoggedIn", isLoggedIn);
  console.log("nextUrl", nextUrl);
  // console.log("isAuthRouteUrl", isAuthRouteUrl(nextUrl.pathname));
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname) || 
  nextUrl.pathname.startsWith('/Cards') || 
  nextUrl.pathname.startsWith('/blog');
  const isAuthRouteMatch = isAuthRoute(nextUrl.pathname);
  
  console.log("isApiAuthRoute", isApiAuthRoute);
  console.log("isPublicRoute", isPublicRoute);
  console.log("isAuthRoute", isAuthRouteMatch);
  
  // Allow API routes to pass through
  if (isApiAuthRoute) {
    return null;
  }

  // Handle auth routes (login, register, etc.)
  if (isAuthRouteMatch) {
    if (isLoggedIn) {
      // If user is logged in and tries to access auth routes,
      // redirect them to the home page or their intended destination
      const callbackUrl = nextUrl.searchParams.get("callbackUrl");
      
      // Only use callbackUrl if it's not an auth route
      const redirectUrl = callbackUrl && !isAuthRouteUrl(callbackUrl) 
        ? callbackUrl 
        : DEFAULT_LOGIN_REDIRECT;
        
      return Response.redirect(new URL(redirectUrl, nextUrl));
    }
    // If user is not logged in, allow access to auth routes
    return null;
  }

  // Handle protected routes
  if (!isLoggedIn && !isPublicRoute) {

    console.log("isLoggedIn", isLoggedIn);
    // Only set callback URL if the current path is not an auth route
    // const currentPath = nextUrl.pathname + nextUrl.search;
    // const callbackUrl = !isAuthRouteUrl(currentPath) 
    //   ? encodeURIComponent(currentPath)
    //   : '';
      
    // const loginUrl = true 
      // ? `/auth/login?callbackUrl=${currentPath}`
      // : '/auth/login';
      
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}