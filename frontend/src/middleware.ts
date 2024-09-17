// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value; // Retrieve token from cookies

  // If no token is present, redirect to login page
  if (!token && req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to continue for other routes
  return NextResponse.next();
}

// Apply middleware to protected routes, but exclude static files, API routes, and login/register pages
export const config = {
  matcher: ['/((?!login|register|_next|static|favicon.ico).*)'], // Avoid interfering with CSS and static assets
};
