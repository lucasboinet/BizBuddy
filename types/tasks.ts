export type AppTaskTodo = {
  name: string;
  completedAt: Date;
}

export type AppTaskPriority = "LOW" | "MEDIUM" | "HIGH";

export enum TASK_STATE {
  'TODO' = 'todo',
  'IN_PROGRESS' = 'in-progress',
  'IN_REVIEW' = 'in-review',
  'DONE' = 'done',
}

export type AppTask = {
  id: string;
  columnId: TASK_STATE;
  name: string;
  description: string;
  todos: AppTaskTodo[];
  createdAt: Date;
  updatedAt: Date;
  dueAt: Date;
  completedAt?: Date;
  priority: AppTaskPriority;
}
