import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { prisma } from "./prisma/prisma";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "worksync@rajansharma.info.np",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        const DbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        token.id = DbUser?.id;
        token.role = DbUser?.role;
        token.phone = DbUser?.phone;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.phone = token.phone as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
