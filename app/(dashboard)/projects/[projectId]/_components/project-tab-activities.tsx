import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ActivityLine from "./activity-line";

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
        <div className="space-y-6">
          {activities.map((activity) => (
            <ActivityLine key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}