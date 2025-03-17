import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function KanbanToolbar() {
  return (
    <div className="flex flex-row items-center gap-4">
      <Button className="w-fit" size="sm">
        <PlusIcon />
        Create project
      </Button>
    </div>
  )
}