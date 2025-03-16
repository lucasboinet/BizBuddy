'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import { KanbanColumn, KanbanId, KanbanTask } from "@/types/kanban";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from "react-dom";
import KanbanColumnContainer from "./kanban-column";
import { cn } from "@/lib/utils";
import KanbanTaskCard from "./kanban-task-card";
import KanbanToolbar from "./kanban-toolbar";
import { generateId } from "@/lib/boards";
import { CreateBoardColumn } from "@/actions/boards/CreateBoardColumn";
import { AppBoard } from "@/types/board";
import { DeleteBoardColumn } from "@/actions/boards/DeleteBoardColumn";
import { UpdateBoardColumn } from "@/actions/boards/UpdateBoardColumn";

export default function KanbanBoard({ className, board }: { className?: string, board: AppBoard }) {
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [activeColumn, setActiveColumn] = useState<KanbanColumn | undefined>(undefined);
  const [activeTask, setActiveTask] = useState<KanbanTask | undefined>(undefined);
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<KanbanTask[]>([{ id: 'task-1', columnId: 'column-1', content: "Task 1" }, { id: 'task-2', columnId: 'column-1', content: "Task 2" }]);

  useEffect(() => {
    setColumns(board.columns);
    setIsMounted(true);
  }, [board.columns])

  const sensors = useSensors(useSensor(
    PointerSensor,
    {
      activationConstraint: {
        distance: 3,
      }
    }
  ))

  const createColumn = useCallback(() => {
    const columnToAdd: KanbanColumn = {
      id: generateId('column'),
      title: `Column ${columns.length + 1}`
    }

    CreateBoardColumn(board.id, columnToAdd)

    setColumns([
      ...columns,
      columnToAdd,
    ])
  }, [board.id, columns])

  const deleteColumn = useCallback((id: KanbanId) => {
    DeleteBoardColumn(board.id, id);

    setColumns([
      ...columns.filter((col) => col.id !== id),
    ])

    setTasks([
      ...tasks.filter((task) => task.columnId !== id)
    ])
  }, [board.id, columns, tasks])

  const updateColumn = useCallback((id: KanbanId, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title }
    });

    UpdateBoardColumn(board.id, id, title);

    setColumns(newColumns);
  }, [board.id, columns])


  function createTask(id: KanbanId) {
    setTasks([
      ...tasks,
      {
        id: generateId('task'),
        columnId: id,
        content: `Tasks ${tasks.length + 1}`
      }
    ])
  }

  function deleteTask(id: KanbanId) {
    setTasks([
      ...tasks.filter((task) => task.id !== id),
    ])
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current?.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(undefined)
    setActiveTask(undefined)

    const { active, over } = event;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveAColumn && isOverAColumn) {
      setColumns((columns) => {
        const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);
        const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);
        return arrayMove(columns, activeColumnIndex, overColumnIndex);
      })
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeTaskId = active.id;
    const overTaskId = over.id;

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
      setTasks((tasks) => {
        const activeTaskIndex = tasks.findIndex((task) => task.id === activeTaskId);

        tasks[activeTaskIndex].columnId = overTaskId;

        return arrayMove(tasks, activeTaskIndex, activeTaskIndex);
      })
    }
  }

  return (
    <div className={cn("flex flex-col w-full justify-start overflow-x-auto overflow-y-hidden flex-grow gap-4", className)}>
      <KanbanToolbar
        createColumn={createColumn}
      />
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsIds}>
              {columns.map((col) => (
                <KanbanColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>
        {isMounted && createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
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
  )
}
