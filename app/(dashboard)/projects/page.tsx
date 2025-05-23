import { GetProjects } from "@/actions/projects/GetProjects";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";
import ProjectsList from "./_components/projects-list";
import ProjectsTimeline from "./_components/projects-timeline/projects-timeline";
import { GetCustomers } from "@/actions/customers/GetCustomers";
import { CreateProjectModal } from "./_components/create-project-modal";
import { Button } from "@/components/ui/button";
import { AppProject } from "@/types/projects";
import { GetTags } from "@/actions/tags/GetTags";

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
  const [projects, tags, customers] = await Promise.all([
    GetProjects(),
    GetTags(),
    GetCustomers()
  ]);

  if (!projects) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className='w-4 h-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong, please try again later</AlertDescription>
      </Alert>
    )
  }

  const timelineProjects = projects.filter((project: AppProject) => !!project.completedAt || !!project.dueAt);

  return (
    <div className="h-full space-y-6">
      <div className="flex items-center justify-start gap-5">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <CreateProjectModal customers={customers} tags={tags}>
          <Button size="sm" className="text-xs">Create project</Button>
        </CreateProjectModal>
      </div>
      <div className="grid grid-cols-12 h-full border-t pt-4">
        <div className="col-span-4 pr-6 border-r">
          <ProjectsList projects={projects} />
        </div>
        <div className="col-span-8 pl-6">
          <ProjectsTimeline projects={timelineProjects} />
        </div>
      </div>
    </div>
  )
}