import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuShortcut, ContextMenuTrigger } from "../ui/context-menu"
import { TrashIcon } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import { AppTask } from "@/types/tasks";

interface Props {
  task: AppTask,
  deleteTask: (id: string) => void
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
        className="bg-secondary border cursor-grab p-2 items-center flex text-left rounded-md hover:ring-2 hover:ring-inset hover:ring-primary/40"
      >
        {task.name}
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