"use server";
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
  const existingUser = await prisma.users.findFirst({
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
