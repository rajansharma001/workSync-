// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      role?: string;
      phone?: string;
    };
  }

  interface User {
    role: string; // 👈 extend the user type
  }
}
