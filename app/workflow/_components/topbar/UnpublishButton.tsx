'use client'

import { UnpublishWorkflow } from '@/actions/workflows/UnpublishWorkflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { DownloadIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function UnpublishButton({ workflowId }: { workflowId: string }) {
  const {mutate, isPending} = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success("Workflow Unpublished", { id: "workflow-unpublish" });
    },
    onError: () => {
      toast.error('Something went wrong, please try again', { id: "workflow-unpublish" });
    }
  })

  return (
    <Button
      variant={'outline'}
      className='flex items-center gap-2'
      onClick={() => {
        toast.loading("Unpublishing workflow...", { id: "workflow-unpublish" });
        mutate({ workflowId });
      }}
      disabled={isPending}
    >
      <DownloadIcon size={16} className='stroke-orange-500' />
      Unpublish
    </Button>
  )
}

export default UnpublishButton