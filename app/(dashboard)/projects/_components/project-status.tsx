import { capitalize } from "@/lib/helper/texts"
import { cn } from "@/lib/utils"
import { PROJECT_STATUS } from "@/types/projects"

interface Props {
  status: PROJECT_STATUS
}

const colors: Record<PROJECT_STATUS, { text: string, border: string, background: string }> = {
  CREATED: {
    text: 'text-red-600',
    border: 'border-red-400',
    background: 'bg-red-200'
  },
  IN_PROGRESS: {
    text: 'text-orange-600',
    border: 'border-orange-400',
    background: 'bg-orange-200'
  },
  WAITING_FOR_APPROVAL: {
    text: 'text-cyan-600',
    border: 'border-cyan-400',
    background: 'bg-cyan-200'
  },
  WAITING_FOR_QUOTATION_SIGNATURE: {
    text: 'text-violet-600',
    border: 'border-violet-400',
    background: 'bg-violet-200'
  },
  COMPLETED: {
    text: 'text-green-600',
    border: 'border-green-400',
    background: 'bg-green-200'
  },
}

export default function ProjectStatus({ status }: Props) {
  const color = colors[status];

  return (
    <div className={cn("flex items-center gap-1 text-xs font-semibold border rounded-md w-fit px-2 py-1", color.text, color.background, color.border)}>
      {capitalize(status)}
    </div>
  )
}