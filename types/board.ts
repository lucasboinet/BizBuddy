import { Board } from "@prisma/client";
import { KanbanColumn } from "./kanban";
import { AppTask } from "./tasks";

export interface AppBoard extends Board {
  columns: KanbanColumn[]
  tasks?: AppTask[]
}