import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./db";
import Client from "@/models/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("All fileds are required");
        }
        await connectDB();
        const password = credentials.password as string;

        const user = await Client.findOne({
          email: credentials.email,
        }).select("+password");
        if (!user) {
          throw new Error("User is not found");
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          throw new Error("Password is incorrect");
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  },
  secret: process.env.AUTH_SECRET,
});
