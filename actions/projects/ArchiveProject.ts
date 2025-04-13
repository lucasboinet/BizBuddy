import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function archiveProject(projectId: string) {
  try {
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    revalidatePath('/');
    return project;
  } catch (error) {
    return null;
  }
}