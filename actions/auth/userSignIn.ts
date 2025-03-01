'use server'

import prisma from "@/lib/prisma";
import { userSignInSchema, UserSignInSchemaType } from "@/schema/auth";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import { createSession } from "../sessions/CreateSession";
import { retrieveSession } from "@/lib/sessions";

export async function UserSignIn(form: UserSignInSchemaType) {
  const { success, data } = userSignInSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    }
  });

  if (!user) {
    throw new Error('Email or password is incorrect');
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password)

  if (!passwordMatch) {
    throw new Error('Email or password is incorrect');
  }

  const authSession = await retrieveSession();

  if (authSession && authSession.sessionId) {
    throw new Error('User already logged in');
  }

  await createSession(user.id);

  redirect(`/`);
}