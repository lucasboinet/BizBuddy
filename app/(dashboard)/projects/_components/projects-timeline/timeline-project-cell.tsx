import { getContrastColor, setHexLuminance, stringToColor } from "@/lib/helper/colors";
import { AppProject } from "@/types/projects";
import { format } from "date-fns";
import { MouseEventHandler } from "react";

interface Props {
  project: AppProject,
  dayWidth: number,
  handleWidth: number,
  getDayIndex: (date: Date) => number,
  handleDragStart: (projectId: string, type: "start" | "end", originalDate: Date) => MouseEventHandler<HTMLDivElement> | undefined,
  dragState: {
    active: boolean;
    projectId: string;
    type: 'start' | 'end';
    originalDate: Date;
    currentDate: Date;
  } | null,
}

export default function TimelineProjectCell({ project, dayWidth, handleWidth, getDayIndex, handleDragStart, dragState }: Props) {
  const formatDateRange = (startDate: Date, endDate: Date) => {
    return `${format(startDate, 'MMM dd')} - ${format(endDate, 'MMM dd')}`;
  };

  const startDayIndex = getDayIndex(new Date(project.createdAt));
  const endDayIndex = getDayIndex(new Date(project.completedAt || project.dueAt));

  const isDragging = dragState?.projectId === project.id;
  const activeDragStartDayIndex = isDragging && dragState.type === 'start'
    ? getDayIndex(dragState.currentDate)
    : startDayIndex;
  const activeDragEndDayIndex = isDragging && dragState.type === 'end'
    ? getDayIndex(dragState.currentDate)
    : endDayIndex;

  const leftPosition = activeDragStartDayIndex * dayWidth;
  const width = (activeDragEndDayIndex - activeDragStartDayIndex + 1) * dayWidth;


  const color = stringToColor(project.id);
  const backgroundColor = setHexLuminance(color, 0.4);
  return (
    <div
      className="absolute rounded-md p-2 h-16 overflow-hidden transition-all hover:shadow-md"
      style={{
        backgroundColor,
        left: `${leftPosition}px`,
        width: `${width}px`,
        top: 0,
        opacity: isDragging ? 0.8 : 1,
        boxShadow: isDragging ? '0 0 8px rgba(0,0,0,0.3)' : 'none',
        cursor: isDragging ? 'grabbing' : 'default',
        transition: isDragging ? 'none' : 'all 0.2s ease',
      }}
    >
      {/* Drag handle for start date */}
      <div
        className="absolute left-0 top-0 bottom-0 w-3 cursor-ew-resize hover:bg-black hover:bg-opacity-10 flex items-center justify-center"
        style={{ width: `${handleWidth}px` }}
        onMouseDown={handleDragStart(project.id, 'start', new Date(project.createdAt))}
      >
        <div className="h-8 w-1 rounded-full opacity-60" style={{ background: getContrastColor(backgroundColor) }} />
      </div>

      <div className="flex-1 px-4 overflow-hidden whitespace-nowrap" style={{ color: getContrastColor(backgroundColor) }}>
        <div className="text-sm font-medium truncate">{project.name}</div>
        <div className="text-xs mt-1">
          {formatDateRange(project.createdAt, project.completedAt || project.dueAt)}
        </div>
      </div>

      {/* Drag handle for end date */}
      <div
        className="absolute right-0 top-0 bottom-0 w-3 cursor-ew-resize hover:bg-black hover:bg-opacity-10 flex items-center justify-center"
        style={{ width: `${handleWidth}px` }}
        onMouseDown={handleDragStart(project.id, 'end', new Date(project.completedAt || project.dueAt))}
      >
        <div className="h-8 w-1 rounded-full opacity-60" style={{ background: getContrastColor(color) }} />
      </div>
    </div>
  )
}