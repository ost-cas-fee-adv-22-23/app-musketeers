export { default } from 'next-auth/middleware';

export const config = { matcher: ['/mumble/:path*', '/profile/:path*', '/settings/:path*'] };
