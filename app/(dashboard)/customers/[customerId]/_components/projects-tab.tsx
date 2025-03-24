import { CreateProjectModal } from "@/app/(dashboard)/projects/_components/create-project-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AppCustomer } from "@/types/customers";
import { PROJECT_STATUS } from "@/types/projects";
import { format } from "date-fns";
import { ArrowRight, Edit, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  customer: AppCustomer;
  activeProjects: number;
  completedProjects: number;
}

export default function ProjectsTab({ customer, activeProjects, completedProjects }: Props) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Projects</h2>
          <p className="text-sm text-muted-foreground">
            {customer.projects.length} projects ({activeProjects} active, {completedProjects} completed)
          </p>
        </div>
        <CreateProjectModal selectedCustomer={customer}>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </CreateProjectModal>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customer.projects.map((project) => (
          <Card key={project.id} className="shadow-none">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="font-medium hover:underline transition-colors"
                  >
                    {project.name}
                  </Link>
                  <Badge
                    className="ml-2"
                  >
                    {project.status === PROJECT_STATUS.COMPLETED
                      ? "Completed"
                      : project.status === PROJECT_STATUS.IN_PROGRESS
                        ? "In Progress"
                        : "Not Started"}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-muted-foreground mb-4">{project.id}</p>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Start Date</div>
                    <div>{format(project.createdAt, "MMM d, yyyy")}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Due Date</div>
                    <div>{format(project.dueAt, "MMM d, yyyy")}</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/dashboard/projects/${project.id}`}>
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}