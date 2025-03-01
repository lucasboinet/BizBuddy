'use client'

import ComboBox from "@/components/ui/combobox";
import { Customer } from "@prisma/client";

export default function CustomerSelect(
  { onValueChange, value, disabled, items }:
    {
      onValueChange: (...event: any[]) => void,
      value: Customer,
      disabled: boolean,
      items: Customer[]
    }
) {

  function handleOnChange(value: Customer | Customer[keyof Customer]) {
    onValueChange('customer', value)
  }

  return (
    <div>
      <ComboBox<Customer>
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