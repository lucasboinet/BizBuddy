import { Activity } from "@prisma/client";
import { AppProject } from "./projects";

export type ActivityType = 'task_completed' | 'invoice_paid' | 'file_uploaded' | 'task_started'

export interface AppActivity extends Activity {
  type: ActivityType;
  project: AppProject;
}