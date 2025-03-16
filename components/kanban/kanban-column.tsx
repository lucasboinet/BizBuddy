'use client'

import { KanbanColumn, KanbanId, KanbanTask } from "@/types/kanban"
import { Button } from "../ui/button"
import { PlusCircleIcon, TrashIcon } from "lucide-react"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import { useMemo, useState } from "react"
import { Input } from "../ui/input"
import KanbanTaskCard from "./kanban-task-card"

interface Props {
  column: KanbanColumn,
  deleteColumn: (id: KanbanId) => void,
  updateColumn: (id: KanbanId, title: string) => void,
  createTask: (id: KanbanId) => void,
  deleteTask: (id: KanbanId) => void,
  tasks: KanbanTask[],
}

export default function KanbanColumnContainer({ column, deleteColumn, updateColumn, createTask, deleteTask, tasks = [] }: Props) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column
    },
    disabled: editMode
  });

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[350px] h-[500px] max-h-[500px] bg-primary-foreground rounded-lg flex flex-col opacity-40 border-2 border-primary"
      >

      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[350px] h-[500px] max-h-[500px] bg-primary-foreground rounded-lg flex flex-col border"
    >
      <div
        {...attributes}
        {...listeners}
        onDoubleClick={() => setEditMode(true)}
        className="bg-secondary text-md px-3 py-2 cursor-grab rounded-lg font-bold border m-2 flex items-center justify-between"
      >
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center bg-primary-foreground rounded-full text-sm px-2 py-0.5">
            {tasks.length}
          </div>
          {!editMode && column.title}
          {editMode && (
            <Input
              value={column.title}
              onChange={((e) => updateColumn(column.id, e.target.value))}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <Button
          onClick={() => deleteColumn(column.id)}
          variant="ghost"
          className="text-gray-500 hover:text-primary/70 hover:bg-primary-foreground/40 rounded px-3">
          <TrashIcon />
        </Button>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
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

      <Button
        variant="ghost"
        className="border-t-2 rounded-t-none"
        onClick={() => createTask(column.id)}
      >
        <PlusCircleIcon />
        Add task
      </Button>
    </div >
  )
}