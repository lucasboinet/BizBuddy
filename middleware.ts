import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/sessions";

const protectedRoutes: string[] = [
  "/"
];

const publicRoutes: string[] = ['/signin', '/signup']

function isProtectedRoute(path: string): boolean {
  return protectedRoutes.includes(path);
}

function isPublicRoute(path: string): boolean {
  return publicRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);
  const isLogged = !!session?.sessionId;

  if (isProtectedRoute(currentPath) && !isLogged) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (
    isPublicRoute(currentPath) &&
    isLogged &&
    currentPath !== '/'
  ) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};