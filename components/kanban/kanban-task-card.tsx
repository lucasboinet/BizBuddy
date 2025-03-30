import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "../ui/context-menu"
import { TrashIcon } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import { AppTask, AppTaskPriority } from "@/types/tasks";
import { format } from "date-fns";
import { capitalize } from "@/lib/helper/texts";
import { cn } from "@/lib/utils";

interface Props {
  task: AppTask,
  deleteTask: (id: string) => void
}

const priorityStyles: Record<AppTaskPriority, string> = {
  HIGH: "bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800",
  MEDIUM: "bg-orange-100 text-orange-700 hover:bg-orange-200 hover:text-orange-800",
  LOW: "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800",
}

export default function KanbanTaskCard({ task, deleteTask }: Props) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="bg-background border rounded-lg p-3 cursor-pointer active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-2 justify-between items-start">
            <div className="flex flex-row justify-between items-start w-full">
              <h3 className="font-medium">{capitalize(task.name)}</h3>
              <span className={cn(priorityStyles[task.priority], "lowercase rounded-full px-2 py-0.5 text-xs font-medium")}>
                {task.priority}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">Due: {format(task.dueAt, 'dd/MM/yyyy')}</div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem className="cursor-pointer text-destructive hover:!text-destructive" onClick={() => deleteTask(task.id)}>
          Delete
          <ContextMenuShortcut>
            <TrashIcon size={15} className="text-destructive" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}