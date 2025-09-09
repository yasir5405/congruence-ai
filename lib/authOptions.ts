import { type AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

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
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
