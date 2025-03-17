'use client'

import { useEffect, useState, useRef, useCallback } from 'react';
import { AppProject } from '@/types/projects';
import { format } from 'date-fns';
import TimelineProjectCell from './timeline-project-cell';

interface Props {
  projects: AppProject[]
}

export default function ProjectsTimeline({ projects }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 16 });
  const [scrollLeft, setScrollLeft] = useState(0);

  const dayWidth = 100;
  const rowGap = 16;
  const initialTopMargin = 16;

  const getDateBoundaries = useCallback(() => {
    if (!projects.length) return { earliest: new Date(), latest: new Date() };

    let earliest = new Date(projects[0].createdAt);
    let latest = new Date(projects[0].completedAt || projects[0].dueAt);

    projects.forEach(project => {
      if (new Date(project.createdAt) < earliest) {
        earliest = new Date(project.createdAt);
      }
      if (new Date(project.completedAt || project.dueAt) > latest) {
        latest = new Date(project.completedAt || project.dueAt);
      }
    });

    const startSunday = new Date(earliest);
    startSunday.setDate(startSunday.getDate() - startSunday.getDay());

    const endSaturday = new Date(latest);
    const daysUntilSaturday = 6 - endSaturday.getDay();
    endSaturday.setDate(endSaturday.getDate() + daysUntilSaturday);

    return { earliest: startSunday, latest: endSaturday };
  }, [projects]);

  const { earliest, latest } = getDateBoundaries();

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

  const visibleProjects = projects.filter(project => {
    const projectEndDay = getDayIndex(project.completedAt || project.dueAt);
    const projectStartDay = getDayIndex(project.createdAt);
    return projectEndDay >= visibleRange.start && projectStartDay <= visibleRange.end;
  });

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    setScrollLeft(scrollPosition);

    const startDay = Math.floor(scrollPosition / dayWidth);
    const containerWidth = container.clientWidth;
    const visibleDays = Math.ceil(containerWidth / dayWidth);

    const bufferDays = 2;
    setVisibleRange({
      start: Math.max(0, startDay - bufferDays),
      end: Math.min(allDays.length - 1, startDay + visibleDays + bufferDays)
    });
  }, [allDays.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  useEffect(() => {

  }, [])

  const calculateLayout = (visibleProjects: AppProject[]) => {
    const rows = [];
    const projectsCopy = [...visibleProjects];

    while (projectsCopy.length > 0) {
      const row = [];
      let lastEnd = null;

      for (let i = 0; i < projectsCopy.length; i++) {
        const project = projectsCopy[i];
        if (lastEnd === null || project.createdAt >= lastEnd) {
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

  const projectRows = calculateLayout(visibleProjects);

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
                      getDayIndex={getDayIndex}
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