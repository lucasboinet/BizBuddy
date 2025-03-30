import { Board } from "@prisma/client";
import { AppTask } from "./tasks";

export interface AppBoard extends Board {
  tasks?: AppTask[]
}