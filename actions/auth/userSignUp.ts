'use server'

import prisma from "@/lib/prisma";
import { userSignUpSchema, UserSignUpSchemaType } from "@/schema/auth";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import { CreateSession } from "../sessions/CreateSession";
// import { CreateProjectsKanbanBoard } from "../boards/CreateProjectsKanbanBoard";

export async function UserSignUp(form: UserSignUpSchemaType) {
  const { success, data } = userSignUpSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    }
  });

  if (existingUser) {
    throw new Error('Informations are incorrect');
  }

  if (data.password !== data.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const user = await prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    }
  });

  await CreateSession(user.id);

  // await CreateProjectsKanbanBoard(user.id);

  redirect(`/`);
}