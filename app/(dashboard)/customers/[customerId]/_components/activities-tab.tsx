import { Card, CardContent } from "@/components/ui/card";
import { AppActivity } from "@/types/activities";
import { format, formatDistanceToNow } from "date-fns";
import { CircleDollarSign, Clock, Edit, FileText, Plus, Users } from "lucide-react";

interface Props {
  activities: AppActivity[]
}

export default function ActivitiesTab({ activities }: Props) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Activity History</h2>
          <p className="text-sm text-muted-foreground">All actions and updates for this customer</p>
        </div>
      </div>

      <Card className="border-green-100">
        <CardContent className="p-6">
          <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-6 before:w-[1px] before:bg-muted">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 relative">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{activity.label}</span>
                    <span className="text-xs text-muted-foreground">{formatDistanceToNow(activity.createdAt, { addSuffix: true })}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(activity.createdAt, "MMMM d, yyyy 'at' h:mm a")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "invoice_paid":
      return <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
    case "project_update":
      return <Edit className="h-5 w-5 text-muted-foreground" />
    case "invoice_sent":
      return <FileText className="h-5 w-5 text-muted-foreground" />
    case "project_started":
      return <Plus className="h-5 w-5 text-muted-foreground" />
    case "customer_added":
      return <Users className="h-5 w-5 text-muted-foreground" />
    default:
      return <Clock className="h-5 w-5 text-muted-foreground" />
  }
}