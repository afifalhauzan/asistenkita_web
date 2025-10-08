import { NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

// Define auth routes that should redirect if already authenticated
const authRoutes = ['/login', '/signup'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Get the session cookie (Appwrite stores session in cookies)
  const sessionCookie = request.cookies.get('a_session_' + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  const isAuthenticated = !!sessionCookie;

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users from auth routes to dashboard
  if (isAuthRoute && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};