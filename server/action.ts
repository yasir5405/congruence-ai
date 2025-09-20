"use server";
import { registerInputSchema } from "@/lib/inputValidation";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const parsedBody = registerInputSchema.safeParse({ name, email, password });

  if (!parsedBody.success) {
    throw new Error(String(parsedBody.error.issues[0].message));
  }

  const existingUser = await prisma.users.findUnique  ({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error("Email already registered!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      updatedAt: new Date(),
    },
  });
};
