import { cn } from "@/lib/utils"
import { PROJECT_STATUS, projectStatusLabels } from "@/types/projects"

interface Props {
  status: PROJECT_STATUS
}

const colors: Record<PROJECT_STATUS, { text: string, background: string }> = {
  CREATED: {
    text: 'text-red-800',
    background: 'bg-red-100'
  },
  IN_PROGRESS: {
    text: 'text-orange-800',
    background: 'bg-orange-100'
  },
  WAITING_FOR_APPROVAL: {
    text: 'text-cyan-800',
    background: 'bg-cyan-100'
  },
  WAITING_FOR_QUOTATION_SIGNATURE: {
    text: 'text-violet-800',
    background: 'bg-violet-100'
  },
  COMPLETED: {
    text: 'text-green-800',
    background: 'bg-green-100'
  },
}

export default function ProjectStatus({ status }: Props) {
  const color = colors[status];

  return (
    <span className={cn("px-2 py-1 text-xs font-medium rounded-full", color.text, color.background)}>
      {projectStatusLabels[status]}
    </span>
  )
}