'use client'

import { useEffect, useMemo, useState } from "react";
import { DndContext, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { createPortal } from "react-dom";
import KanbanColumnContainer from "./kanban-column";
import { cn } from "@/lib/utils";
import KanbanTaskCard from "./kanban-task-card";
import KanbanToolbar from "./kanban-toolbar";
import { AppTask, TASK_STATE } from "@/types/tasks";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { UpdateTask } from "@/actions/tasks/UpdateTask";
import { AppProject } from "@/types/projects";

const columns = [
  { id: TASK_STATE.TODO, title: 'To Do' },
  { id: TASK_STATE.IN_PROGRESS, title: 'In Progress' },
  { id: TASK_STATE.IN_REVIEW, title: 'In Review' },
  { id: TASK_STATE.DONE, title: 'Completed' },
]

export default function KanbanBoard({ className, project }: { className?: string, project: AppProject }) {
  const [activeTask, setActiveTask] = useState<AppTask | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<AppTask[]>([]);

  const board = useMemo(() => project.board!, [project]);

  useEffect(() => {
    setTasks(board.tasks || []);
    setIsMounted(true);
  }, [board.tasks])

  const sensors = useSensors(useSensor(
    PointerSensor,
    {
      activationConstraint: {
        distance: 3,
      }
    }
  ))

  // function createTask(id: string) {
  //   setTasks([
  //     ...tasks,
  //     {
  //       id: generateId('task'),
  //       columnId: id,
  //       content: `Tasks ${tasks.length + 1}`
  //     }
  //   ])
  // }

  function deleteTask(id: string) {
    setTasks([
      ...tasks.filter((task) => task.id !== id),
    ])
  }

  function updateTask(id: string, changes: Partial<AppTask>) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, ...changes }
    });

    UpdateTask(id, changes);

    setTasks(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id as TASK_STATE;
    const overTaskId = over.id as TASK_STATE;

    if (activeTaskId === overTaskId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeTaskId);
        const overTaskIndex = tasks.findIndex((task) => task.id === overTaskId);

        tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

        return arrayMove(tasks, activeTaskIndex, overTaskIndex);
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      updateTask(activeTaskId as string, { columnId: overTaskId })
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeTaskId);
        tasks[activeTaskIndex].columnId = overTaskId as TASK_STATE;
        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      })
    }
  }

  return (
    <Card className={cn("flex flex-col w-full justify-start gap-4", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Kanban Board</CardTitle>
        <KanbanToolbar project={project} />
      </CardHeader>
      <div className="flex-1 px-6">
        <div className="w-full gap-4 h-full pb-4">
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
          >
            <div className="w-full gap-4 grid grid-cols-4">
              {columns.map((col) => (
                <KanbanColumnContainer
                  key={col.id}
                  column={col}
                  deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  className="col-span-1"
                />
              ))}
            </div>

            {isMounted && createPortal(
              <DragOverlay>
                {activeTask && (
                  <KanbanTaskCard
                    task={activeTask}
                    deleteTask={deleteTask}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </div>
      </div>
    </Card>
  )
}
