'use server'

import prisma from "@/lib/primsa";
import { WorkflowStatus } from "@/types/workflows";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UnpublishWorkflow({ workflowId }: { workflowId: string }) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('UnAuthenticated');
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: workflowId,
    }
  });

  if (!workflow) throw new Error('Workflow not found');

  if (workflow.status === WorkflowStatus.DRAFT) {
    throw new Error("Workflow already unpublished");
  }

  await prisma.workflow.update({
    where: {
      id: workflowId,
      userId,
    },
    data: {
      executionPlan: undefined,
      creditsCost: 0,
      status: WorkflowStatus.DRAFT,
    }
  })

  revalidatePath(`/workflow/editor/${workflowId}`);
}