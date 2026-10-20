import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/admin/login',
  },
  session: {strategy: 'jwt'},
  providers: [],
  callbacks: {
    authorized({auth, request}) {
      const isAdmin = request.nextUrl.pathname.startsWith('/admin');
      const isLogin = request.nextUrl.pathname.startsWith('/admin/login');
      if (!isAdmin || isLogin) return true;
      return Boolean(auth?.user);
    },
    jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({session, token}) {
      if (session.user && token.id) {
        session.user.id = String(token.id);
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
