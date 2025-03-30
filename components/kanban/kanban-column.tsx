'use client'

import { KanbanColumn } from "@/types/kanban"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { useMemo } from "react"
import KanbanTaskCard from "./kanban-task-card"
import { AppTask } from "@/types/tasks"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"

interface Props {
  column: KanbanColumn,
  deleteTask: (id: string) => void,
  tasks: AppTask[],
  className?: string
}

export default function KanbanColumnContainer({ column, deleteTask, tasks = [], className }: Props) {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("w-full h-[800px] max-h-[800px] bg-muted/40 rounded-lg p-3 flex flex-col", className)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{column.title}</h3>
        <Badge variant="outline">{tasks.length}</Badge>
      </div>

      <div className="flex flex-grow flex-col gap-4 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </div>
    </div >
  )
}