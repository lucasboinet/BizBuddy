'use client'

import ComboBox from "@/components/ui/combobox";
import { AppCustomer } from "@/types/customers";

export default function CustomerSelect(
  { onValueChange, value, disabled, items }:
    {
      onValueChange: (...event: any[]) => void,
      value: AppCustomer,
      disabled?: boolean,
      items: AppCustomer[]
    }
) {

  function handleOnChange(value: AppCustomer | AppCustomer[keyof AppCustomer]) {
    onValueChange(value)
  }

  return (
    <div>
      <ComboBox<AppCustomer>
        title="Customer"
        valueKey="id"
        labelKey="name"
        value={value}
        items={items}
        renderText={(customer) => `${customer.name}`}
        onChange={handleOnChange}
        disabled={disabled}
        complete
      />
    </div>
  )
}