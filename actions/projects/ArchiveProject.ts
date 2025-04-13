'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function ArchiveProject(projectId: string) {
  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidatePath('/projects');
}