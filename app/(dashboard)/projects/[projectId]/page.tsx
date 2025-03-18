import { GetProject } from "@/actions/projects/GetProject";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { GetCustomers } from "@/actions/customers/GetUserCustomers";
import ProjectPageDetails from "./_components/project-page-details";

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  return (
    <div className='flex-1 flex flex-col h-full'>

      <div className='h-full py-6'>
        <Suspense fallback={<ProjectSkeleton />}>
          <ProjectDetails projectId={params.projectId} />
        </Suspense>
      </div>
    </div>
  );
}

function ProjectSkeleton() {
  return (
    <div className='space-y-2'>
      <Skeleton className='h-11 w-full' />
    </div>
  );
}

async function ProjectDetails({ projectId }: { projectId: string }) {
  const [project, customers] = await Promise.all([
    GetProject(projectId),
    GetCustomers()
  ]);

  if (!project) {
    redirect('/projects');
  }

  return (
    <ProjectPageDetails project={project} />
  )
}