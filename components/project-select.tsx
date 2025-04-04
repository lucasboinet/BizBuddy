'use client'

import ComboBox from "@/components/ui/combobox";
import { AppProject } from "@/types/projects";

export default function ProjectSelect(
  { onValueChange, value, disabled, items }:
    {
      onValueChange: (...event: any[]) => void,
      value: AppProject | undefined,
      disabled?: boolean,
      items: AppProject[]
    }
) {

  function handleOnChange(value: AppProject | AppProject[keyof AppProject]) {
    onValueChange(value)
  }

  return (
    <div>
      <ComboBox<AppProject>
        title="Project"
        valueKey="id"
        labelKey="name"
        value={value}
        items={items}
        renderText={(project) => `${project.name}`}
        onChange={handleOnChange}
        disabled={disabled}
        complete
      />
    </div>
  )
}