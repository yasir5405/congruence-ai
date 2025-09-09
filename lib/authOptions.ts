import { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          placeholder: "youremail@domain.com",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "********",
          type: "password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!password) return null;

        const foundUser = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });

        if (!foundUser) return null;
        if (!foundUser.password) return null;

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) return null;

        return {
          id: String(foundUser.id),
          email: foundUser.email,
          name: foundUser.name,
          image: foundUser.profileImage,
          role: foundUser.role,
        };
      },
    }),
    Google({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.users.findFirst({
          where: {
            email: user?.email ?? "",
          },
        });

        if (existingUser && existingUser.profileImage === null) {
          await prisma.users.update({
            where: {
              id: existingUser.id,
            },
            data: {
              profileImage: user.image,
              updatedAt: new Date(),
            },
          });
        }

        if (!existingUser) {
          await prisma.users.create({
            data: {
              email: user.email ?? "",
              name: user.name ?? "",
              profileImage: user.image,
              updatedAt: new Date(),
            },
          });
        }

        (user as any).role = existingUser?.role;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
