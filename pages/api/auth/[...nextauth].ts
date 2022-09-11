import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { prisma } from "../../../prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = req.body as never;
        const user = await prisma.user.findUnique({
          where: { username },
          include: { roles: true },
        });

        if (!user) return null;

        const isPassValid = await bcrypt.compare(password, user.password);

        if (!isPassValid) return null;

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      delete token.picture;
      delete token.name;

      if (user) {
        delete user.password;
        token = { ...token, ...user };
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = { ...token };
      return session;
    },
  },
});
