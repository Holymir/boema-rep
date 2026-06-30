import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for API routes, Next internals, the Sanity
  // Studio, and anything with a file extension (static assets).
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};
