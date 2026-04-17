import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email:{},
            password:{}
        },
        async authorize(credentials) {
            console.log("Credentials received:", credentials);
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials?.email as string
                }
            });
            
            if (!user) {
                return null;
            }
             const isPasswordValid = await bcrypt.compare(
                credentials?.password as string,
                user.password
            );
            if (!isPasswordValid) {
                return null;
            }
            console.log("User found:", user);
            return user;
        }
    })
    ],
    session: {
        strategy: "jwt"
    },
  pages: {
    signIn: "/login",
  },
  callbacks: {
  async session({ session, token }) {
    if (token.sub) {
      session.user.id = token.sub;
    }
    return session;
  },
},

});