import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  createColumn: () => void,
}

export default function KanbanToolbar({ createColumn }: Props) {
  return (
    <div className="flex flex-row items-center gap-4">
      <Button className="w-fit" onClick={() => createColumn()}>
        <PlusIcon />
        Add column
      </Button>
    </div>
  )
}