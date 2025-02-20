'use server'

import prisma from "@/lib/primsa";
import { WorkflowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helpers";
import { WorkflowStatus } from "@/types/workflows";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({ workflowId, flowDefinition }: { workflowId: string, flowDefinition: string }) {
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

  if (workflow.status === WorkflowStatus.PUBLISHED) {
    throw new Error("Workflow already published");
  }

  const flow = JSON.parse(flowDefinition);
  const result = WorkflowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("Workflow definition not valid");
  }

  if (!result.executionPlan) {
    throw new Error("No execution plan generated");
  }

  const creditsCost = CalculateWorkflowCost(flow.nodes);

  await prisma.workflow.update({
    where: {
      id: workflowId,
      userId,
    },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED,
    }
  })

  revalidatePath(`/workflow/editor/${workflowId}`);
}