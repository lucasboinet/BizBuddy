export type AppTaskTodo = {
  name: string;
  completedAt: Date;
}

export type AppTask = {
  id: string;
  columnId: string;
  name: string;
  description: string;
  todos: AppTaskTodo[];
  createdAt: Date;
  updatedAt: Date;
}