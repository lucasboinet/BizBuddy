import { GetProjects } from "@/actions/projects/GetUserProjects";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import ProjectsList from "./_components/projects-list";
import ProjectsTimeline from "./_components/projects-timeline/projects-timeline";

export default function ProjectsPage() {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<ProjectsSkeleton />}>
          <Projects />
        </Suspense>
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className='space-y-2'>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className='h-32 w-full' />
      ))}
    </div>
  );
}

async function Projects() {
  const projects = await GetProjects();

  if (!projects) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong, please try again later</AlertDescription>
      </Alert>
    )
  }

  // if (projects.length === 0) {
  //   return (
  //     <div className='flex flex-col gap-4 h-full items-center'>
  //       {JSON.stringify(projects)}
  //     </div>
  //   )
  // }

  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-4 pr-6 border-r">
        <ProjectsList projects={projects} />
      </div>
      <div className="col-span-8 pl-6 flex flex-grow">
        <ProjectsTimeline projects={projects} />
      </div>
    </div>
  )
}