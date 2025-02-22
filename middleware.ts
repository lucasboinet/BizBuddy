import { NextRequest, NextResponse } from "next/server";
import { retrieveSession } from "./lib/sessions";

const protectedRoutes: string[] = [
  "/",
  "/customers",
  "/invoices",
  "/projects",
  "/settings",
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
  const session = await retrieveSession();
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