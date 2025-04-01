import { ActivityType, AppActivity } from "@/types/activities";
import { format } from "date-fns";
import { CheckCircle2, Clock, FileText } from "lucide-react";

const activityColors: Record<ActivityType, string> = {
  'file_uploaded': 'bg-amber-100 text-amber-600',
  'invoice_paid': 'bg-blue-100 text-blue-600',
  'task_completed': 'bg-green-100 text-green-600',
  'task_started': 'bg-gray-100 text-gray-600',
}

export default function ActivityLine({ activity }: { activity: AppActivity }) {
  return (
    <div className="flex items-center gap-3 relative">
      <div
        className={`rounded-full p-2 ${activityColors[activity.type]}`}
      >
        {activity.type === "task_completed" && <CheckCircle2 className="h-4 w-4" />}
        {activity.type === "invoice_paid" && <FileText className="h-4 w-4" />}
        {activity.type === "file_uploaded" && <FileText className="h-4 w-4" />}
        {activity.type === "task_started" && <Clock className="h-4 w-4" />}
      </div>
      <div className="flex-1">
        <p className="text-sm">{activity.label}</p>
        <p className="text-xs text-muted-foreground">
          {format(activity.createdAt, "MMMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </div>
  )
}