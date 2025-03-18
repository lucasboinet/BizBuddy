'use client'

import { useRef, useCallback, useState, useEffect } from 'react';
import { AppProject } from '@/types/projects';
import { addDays, differenceInDays, format, subDays } from 'date-fns';
import TimelineProjectCell from './timeline-project-cell';
import { UpdateTimelineProject } from '@/actions/projects/UpdateTimelineProject';

interface Props {
  projects: AppProject[]
}

export default function ProjectsTimeline({ projects }: Props) {
  const [internalProjects, setInternalProjects] = useState<AppProject[]>(projects);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragState, setDragState] = useState<{
    active: boolean;
    projectId: string;
    type: 'start' | 'end';
    originalDate: Date;
    currentDate: Date;
  } | null>(null);

  const dayWidth = 100;
  const rowGap = 16;
  const initialTopMargin = 16;
  const handleWidth = 12;
  const daysBuffer = 2;

  useEffect(() => {
    setInternalProjects(projects);
  }, [projects])

  const getDateBoundaries = useCallback(() => {
    if (!internalProjects.length) return { earliest: new Date(), latest: new Date() };

    const containerWidth = scrollContainerRef.current?.clientWidth || 1;
    const minDaysCapacity = Math.max(20, Math.ceil(containerWidth / dayWidth));

    let earliest = new Date(internalProjects[0].createdAt);
    let latest = new Date(internalProjects[0].completedAt || internalProjects[0].dueAt);

    internalProjects.forEach(project => {
      if (new Date(project.createdAt) < earliest) {
        earliest = new Date(project.createdAt);
      }
      if (new Date(project.completedAt || project.dueAt) > latest) {
        latest = new Date(project.completedAt || project.dueAt);
      }
    });

    const currentRangeDays = differenceInDays(latest, earliest);
    const capacityLeft = minDaysCapacity - currentRangeDays;

    earliest = subDays(earliest, daysBuffer)
    latest = addDays(latest, capacityLeft > daysBuffer ? capacityLeft : daysBuffer - 1)

    return { earliest, latest };
  }, [internalProjects, scrollContainerRef]);

  const { earliest, latest } = getDateBoundaries()

  const generateDaysArray = useCallback((startDate: Date, endDate: Date) => {
    const days = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }, []);

  const allDays = generateDaysArray(earliest, latest);

  const getDayIndex = useCallback((date: Date) => {
    return Math.floor((date.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24));
  }, [earliest]);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    setScrollLeft(scrollPosition);
  }, []);

  const getDateFromPosition = useCallback((positionX: number) => {
    const dayIndex = Math.floor(positionX / dayWidth);
    return addDays(new Date(earliest), dayIndex);
  }, [earliest, dayWidth]);

  const calculateLayout = () => {
    const rows = [];
    const projectsCopy = [...internalProjects];

    while (projectsCopy.length > 0) {
      const row = [];
      let lastEnd = null;

      for (let i = 0; i < projectsCopy.length; i++) {
        const project = projectsCopy[i];
        if (lastEnd === null || project.createdAt > lastEnd) {
          row.push(project);
          lastEnd = new Date(project.completedAt || project.dueAt);
          projectsCopy.splice(i, 1);
          i--;
        }
      }
      rows.push(row);
    }
    return rows;
  };

  const projectRows = calculateLayout();

  const handleDragStart = (projectId: string, type: 'start' | 'end', originalDate: Date) => (e: React.MouseEvent) => {
    e.preventDefault();
    const project = internalProjects.find(p => p.id === projectId);
    if (!project) return;

    setDragState({
      active: true,
      projectId,
      type,
      originalDate: new Date(originalDate),
      currentDate: new Date(originalDate),
    });
  };

  const handleAutoScroll = useCallback((mouseX: number) => {
    if (!scrollContainerRef.current || !dragState?.active) return;

    const container = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollSpeed = 15;
    const edgeThreshold = 50;

    const distanceFromLeft = mouseX - rect.left;
    const distanceFromRight = rect.right - mouseX;

    if (distanceFromLeft < edgeThreshold) {
      const scrollAmount = Math.max(scrollSpeed * (1 - distanceFromLeft / edgeThreshold), 5);
      container.scrollLeft -= scrollAmount;
    }
    else if (distanceFromRight < edgeThreshold) {
      const scrollAmount = Math.max(scrollSpeed * (1 - distanceFromRight / edgeThreshold), 5);
      container.scrollLeft += scrollAmount;
    }
  }, [dragState]);

  const handleDragMove = useCallback((e: React.MouseEvent) => {
    if (!dragState?.active || !scrollContainerRef.current) return;

    handleAutoScroll(e.clientX);

    const container = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    const relativeX = e.clientX - rect.left + container.scrollLeft;
    const newDate = getDateFromPosition(relativeX);

    const project = internalProjects.find(p => p.id === dragState.projectId);
    if (!project) return;

    let validDate = new Date(newDate);
    if (dragState.type === 'start') {
      const endDate = new Date(project.completedAt || project.dueAt);
      if (validDate >= endDate) {
        validDate = new Date(endDate);
        validDate.setDate(validDate.getDate() - 1);
      }
    } else {
      const startDate = new Date(project.createdAt);
      if (validDate <= startDate) {
        validDate = new Date(startDate);
        validDate.setDate(validDate.getDate() + 1);
      }
    }

    setDragState(prev => prev ? { ...prev, currentDate: validDate } : null);
  }, [dragState, internalProjects, getDateFromPosition, handleAutoScroll]);

  const handleDragEnd = useCallback(async () => {
    if (!dragState?.active) return;

    const project = internalProjects.find(p => p.id === dragState.projectId);
    if (!project) return;

    if (dragState.originalDate.getTime() !== dragState.currentDate.getTime()) {
      const changes = dragState.type === 'start'
        ? { createdAt: dragState.currentDate }
        : project.completedAt
          ? { completedAt: dragState.currentDate }
          : { dueAt: dragState.currentDate };

      const projectIndex = internalProjects.findIndex((p) => p.id === project.id);

      try {
        UpdateTimelineProject(project.id, changes);
        internalProjects[projectIndex] = { ...project, ...changes };
      } catch {
        internalProjects[projectIndex] = { ...project };
      } finally {
        setInternalProjects(internalProjects)
      }
    }

    setDragState(null);
  }, [dragState, internalProjects]);

  return (
    <div className="w-full">
      <div className="relative flex flex-col h-full">
        <div className="sticky top-0 z-20 bg-white mb-2 overflow-hidden">
          <div
            className="flex"
            style={{ marginLeft: `${-scrollLeft}px` }}
          >
            {allDays.map((date, index) => (
              <div key={index} className={`flex-shrink-0 w-[${dayWidth}px] text-sm text-gray-600 pb-1`}>
                <div>{format(date, 'E dd')}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 max-w-full flex-grow border rounded-xl"
          style={{
            overscrollBehavior: 'contain',
            boxShadow: 'inset 0px 0px 40px -14px #E0E0E0'
          }}
          onMouseMove={dragState?.active ? handleDragMove : undefined}
          onMouseUp={dragState?.active ? handleDragEnd : undefined}
          onMouseLeave={dragState?.active ? handleDragEnd : undefined}
          onScroll={handleScroll}
        >
          <div className="relative h-full" style={{ width: `${allDays.length * dayWidth}px`, minHeight: '400px' }}>
            <div className="absolute top-0 left-0 right-0 bottom-0 grid grid-cols-1 divide-x divide-gray-200 z-0">
              {allDays.map((_, index) => (
                <div
                  key={index}
                  className="absolute top-0 bottom-0 border-gray-200"
                  style={{ left: `${index * dayWidth}px`, width: `${dayWidth}px` }}
                />
              ))}
            </div>

            <div className="relative z-10" style={{ paddingTop: `${initialTopMargin}px` }}>
              {projectRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="relative h-16"
                  style={{
                    marginBottom: `${rowGap}px`
                  }}
                >
                  {row.map(project => (
                    <TimelineProjectCell
                      key={project.id}
                      project={project}
                      dayWidth={dayWidth}
                      handleWidth={handleWidth}
                      getDayIndex={getDayIndex}
                      handleDragStart={handleDragStart}
                      dragState={dragState}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};