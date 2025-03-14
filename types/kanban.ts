export type KanbanId = string | number;

export type KanbanColumn = {
  id: KanbanId;
  title: string;
}

export type KanbanTask = {
  id: KanbanId;
  columnId: KanbanId;
  content: string;
}