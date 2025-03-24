import { AppProject } from "@/types/projects";

interface Props {
  project: AppProject
}

export default function ProjectTabInfos({ project }: Props) {
  return (
    <div>{JSON.stringify(project, null, 2)}</div>
  )
}