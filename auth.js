import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("credentials: ", credentials);
        return { id: "123456" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("user: ", user);
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
    },

    authorized({ request: { nextUrl }, auth }) {
      console.log(nextUrl);
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/profile"];
      const isProtectedRoute = protectedPaths.some(
        (path) => nextUrl.pathname === path
      );

      if (isProtectedRoute && !isLoggedIn) {
        const redirectUrl = new URL("/api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return NextResponse.redirect(redirectUrl);
      }
      return true;
    },
  },
});
