import { Board } from "@prisma/client";
import { KanbanColumn } from "./kanban";

export interface AppBoard extends Board {
  columns: KanbanColumn[]
}