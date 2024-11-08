import GoogleProvider from "next-auth/providers/google";

import { DefaultSession, NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("SignIn User:", user);

      try {
        const isUserExists = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!isUserExists) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
            },
          });
           axios.post(`http://backend-service:3000/v1/user/signin`, {
            userId: newUser.id,
          });
          user.id = newUser.id;
        } else {
          user.id = isUserExists.id;
        }
      } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
