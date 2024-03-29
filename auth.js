import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { User } from "./lib/database/models/User";
import { connectToDatabase } from "./lib/database/dbUtils";
import { compareSync } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("recieved credentials: ", credentials);
        await connectToDatabase();
        const { password, email } = credentials;
        const user = await User.findOne({ email }).exec();
        if (!user) return null;
        const isPasswordCorrect = compareSync(password, user.password);
        if (!isPasswordCorrect) return null;
        console.log("Successfully Signed-In User: ", user);
        return { id: user._id, email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = { ...token.user };
      }
    },

    authorized({ request: { nextUrl }, auth }) {
      console.log(nextUrl.href);
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/profile"];
      const isProtectedRoute = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtectedRoute && !isLoggedIn) {
        const redirectUrl = new URL("/api/auth/signin", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        console.log("authorized redirectUrl: ", redirectUrl.toString());
        return NextResponse.redirect(redirectUrl);
      }
      return true;
    },
  },
});
