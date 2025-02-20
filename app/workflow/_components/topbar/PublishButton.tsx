'use client'

import { PublishWorkflow } from '@/actions/workflows/publishWorkflow'
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { UploadIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function PublishButton({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const {mutate, isPending} = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow published", { id: "workflow-publish" });
    },
    onError: () => {
      toast.error('Something went wrong, please try again', { id: "workflow-publish" });
    }
  })

  return (
    <Button
      variant={'outline'}
      className='flex items-center gap-2'
      onClick={() => {
        const plan = generate();

        if (!plan) return;

        toast.loading("Publishing workflow...", { id: "workflow-publish" });
        mutate({ 
          workflowId, 
          flowDefinition: JSON.stringify(toObject()) 
        });
      }}
      disabled={isPending}
    >
      <UploadIcon size={16} className='stroke-green-400' />
      Publish
    </Button>
  )
}

export default PublishButton