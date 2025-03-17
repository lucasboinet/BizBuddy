import { setHexLuminance, stringToColor } from "@/lib/helper/colors";
import { AppProject } from "@/types/projects";
import { format } from "date-fns";

interface Props {
  project: AppProject,
  dayWidth: number,
  getDayIndex: (date: Date) => number
}

export default function TimelineProjectCell({ project, dayWidth, getDayIndex }: Props) {
  const formatDateRange = (startDate: Date, endDate: Date) => {
    return `${format(startDate, 'MMM dd')} - ${format(endDate, 'MMM dd')}`;
  };

  const getProjectPosition = (project: AppProject) => {
    const diffDays = getDayIndex(project.createdAt);
    return diffDays * dayWidth;
  };

  const getProjectWidth = (project: AppProject) => {
    const endDate = project.completedAt || project.dueAt;
    const diffDays = Math.floor((endDate.getTime() - project.createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diffDays * dayWidth;
  };

  const color = stringToColor(project.name);

  return (
    <div
      className="absolute rounded-md p-2 h-16 overflow-hidden transition-all hover:shadow-md border"
      style={{
        borderColor: color,
        backgroundColor: setHexLuminance(color, 0.25),
        left: `${getProjectPosition(project)}px`,
        width: `${getProjectWidth(project)}px`,
        top: 0
      }}
    >
      <div className="text-sm font-medium truncate">{project.name}</div>
      <div className="text-xs text-gray-500 mt-1">
        {formatDateRange(project.createdAt, project.completedAt || project.dueAt)}
      </div>
    </div>
  )
}