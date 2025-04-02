import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { INVOICE_STATUS } from "@/types/invoices";
import { AppProject } from "@/types/projects";
import { TASK_STATE } from "@/types/tasks";
// import { Download, ImageIcon, Music, Video } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import ActivityLine from "./activity-line";

interface Props {
  project: AppProject;
  activities: any[];
  files: any[];
  setActiveTab: (tab: string) => void;
}

export default function ProjectTabOverview({ project, activities, setActiveTab }: Props) {
  const financials = useMemo(() => [...project.invoices], [project.invoices]);
  const totalInvoiced = financials.reduce((acc, document) => acc + document.amount, 0)
  const totalPaid = financials.reduce((acc, document) => document.status === INVOICE_STATUS.PAID ? acc + document.amount : acc, 0)
  const totalOutstanding = financials.reduce((acc, document) => document.status === INVOICE_STATUS.REFUSED ? acc + document.amount : acc, 0)

  const paymentProgress = useMemo(() => {
    if (totalInvoiced === 0) return 0;
    return Math.round((totalPaid / totalInvoiced) * 100);
  }, [totalInvoiced, totalPaid]);

  const projectProgress = useMemo(() => {
    const today = new Date().getTime();
    const start = project.startedAt?.getTime() || 0;
    const end = project.dueAt?.getTime() || 0;

    if (project.completedAt) return 100;
    if (!project.startedAt || !project.dueAt) return 0;
    if (today > end) return 100;

    return Math.min(100, Math.round(((today - start) / (end - start)) * 100))
  }, [project]);

  const tasksCount = project.board?.tasks?.length || 0;
  const todoTasksCount = project.board?.tasks?.filter((task) => task.columnId === TASK_STATE.TODO).length || 0;
  const inProgressTasksCount = project.board?.tasks?.filter((task) => task.columnId === TASK_STATE.IN_PROGRESS).length || 0;
  const completedTasksCount = project.board?.tasks?.filter((task) => [TASK_STATE.IN_REVIEW, TASK_STATE.DONE].includes(task.columnId)).length || 0;

  const tasksProgress = useMemo(() => {
    if (tasksCount === 0) return 0;
    return Math.round(completedTasksCount / tasksCount * 100)
  }, [tasksCount, completedTasksCount]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Project Summary Card */}
      <Card className="md:col-span-2 lg:col-span-2 overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle>Project Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="space-y-2 mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="text-sm">{project.description}</p>
                <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                <div className="flex items-center gap-2">
                  {project.tags.map((projectTag) => (
                    <Badge key={projectTag.tagId} variant="secondary" className={`bg-primary text-secondary hover:bg-primary/80 hover:text-secondary flex items-center gap-1 px-2 py-1`}>
                      {projectTag.tag.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
                <div className="relative pt-2">
                  <div className="absolute left-0 right-0 h-1 bg-muted rounded-full">
                    <div
                      className="absolute h-1 bg-primary rounded-full"
                      style={{ width: `${projectProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <div>
                      <p className="font-medium">{project.startedAt?.toLocaleString() || '-'}</p>
                      <p className="text-muted-foreground">Start Date</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{project.dueAt.toLocaleString()}</p>
                      <p className="text-muted-foreground">Due Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[180px]">
              <div className="relative h-[180px] w-[180px] mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="10"
                    strokeDasharray={`${(2 * Math.PI * 40 * projectProgress) / 100} ${(2 * Math.PI * 40 * (100 - projectProgress)) / 100}`}
                    strokeDashoffset={(2 * Math.PI * 40 * 25) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{projectProgress}%</span>
                  <span className="text-sm text-muted-foreground">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Status Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Project Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {Math.floor(
                  (new Date(project.dueAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )}{" "}
                days left
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tasks</span>
                <span className="font-medium">
                  {tasksCount}
                </span>
              </div>

              <div className="flex flex-row items-center gap-4">
                <div className="relative w-full h-1 bg-muted rounded-full">
                  <div
                    className="absolute h-1 bg-primary rounded-full"
                    style={{ width: `${tasksProgress}%` }}
                  />
                </div>
                <span className="font-medium">{tasksProgress}%</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <h3 className="text-sm font-medium">Task Breakdown</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-muted/40 rounded-lg p-2">
                  <div className="text-lg font-medium">{todoTasksCount}</div>
                  <div className="text-xs text-muted-foreground">To Do</div>
                </div>
                <div className="bg-muted/40 rounded-lg p-2">
                  <div className="text-lg font-medium">{inProgressTasksCount}</div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
                <div className="bg-muted/40 rounded-lg p-2">
                  <div className="text-lg font-medium">{completedTasksCount}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card className="md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Invoiced</span>
              <span className="font-medium">${totalInvoiced.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Paid</span>
              <span className="font-medium">${totalPaid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Outstanding</span>
              <span className="font-medium">${totalOutstanding.toLocaleString()}</span>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Payment Progress</span>
                <span>{paymentProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${paymentProgress}%` }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Files */}
      <Card className="md:col-span-1 relative">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle>Recent Files</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#" onClick={() => setActiveTab("files")}>
              View all
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h5 className="text-muted-foreground text-sm">Coming soon</h5>
          </div>
          {/* <div className="space-y-3">
            {files.slice(0, 4).map((file) => (
              <div key={file.id} className="flex items-center gap-3 group">
                {file.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                {file.type === "docx" && <FileText className="h-5 w-5 text-blue-500" />}
                {file.type === "sketch" && <ImageIcon className="h-5 w-5 text-amber-500" />}
                {file.type === "jpg" && <ImageIcon className="h-5 w-5 text-green-500" />}
                {file.type === "png" && <ImageIcon className="h-5 w-5 text-green-500" />}
                {file.type === "mp4" && <Video className="h-5 w-5 text-purple-500" />}
                {file.type === "mp3" && <Music className="h-5 w-5 text-pink-500" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.date}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div> */}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="#" onClick={() => setActiveTab("activity")}>
              View all
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-2">
            {activities.slice(0, 4).map((activity) => (
              <ActivityLine key={activity.id} activity={activity} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}