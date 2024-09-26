import NextAuth from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider, { GithubProfile } from "next-auth/providers/github";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      async profile(profile: GithubProfile) {
        const existingEmail = await prisma.user.findUnique({
          where: { email: profile.email || undefined },
        });
        if (existingEmail) {
          return existingEmail;
        }
        const user = await prisma.user.create({
          data: {
            nickname: "",
            firstName: profile.login,
            email: String(profile.email),
            lastName: "",
            password: "",
          },
        });
        return user;
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error("No user found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async session({ session, token, user }: any) {
      if (user?.nickname) {
        session.user.nickname = user.nickname;
      } else if (token?.nickname) {
        session.user.nickname = token.nickname;
      }

      return session;
    },
    async jwt({ token, user }: any) {
      if (user?.nickname) {
        token.nickname = user.nickname;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
