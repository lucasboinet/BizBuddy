import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, FileText } from "lucide-react";

interface Props {
  activities: any[];
}

export default function ProjectTabActivities({ activities }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Activity</CardTitle>
        <CardDescription>A chronological history of all project activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className="relative mt-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
                {activity.id !== activities[activities.length - 1].id && (
                  <div className="absolute top-2 bottom-0 left-1 -ml-px w-px bg-border" />
                )}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.date} at {activity.time}
                  </div>
                </div>
                <div className="rounded-md bg-muted p-3 text-sm">
                  {activity.type === "task_completed" && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Task marked as completed</span>
                    </div>
                  )}
                  {activity.type === "invoice_paid" && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      <span>Payment received and recorded</span>
                    </div>
                  )}
                  {activity.type === "file_uploaded" && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>New file added to project</span>
                    </div>
                  )}
                  {activity.type === "task_started" && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>Task work has begun</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}