import NextAuthMiddleware from "next-auth/middleware";

export default function middleware(req) {
  return NextAuthMiddleware(req);
}

export const config = {
  matcher: [
    '/properties/add',
    '/profile',
    '/properties/saved',
    '/messages'
  ]
};