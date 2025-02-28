'use client'

import ComboBox from "@/components/ui/combobox";
import { Customer } from "@prisma/client";

export default function CustomerSelect(
  { onValueChange, value, disabled, items }:
    {
      onValueChange: (...event: any[]) => void,
      value: string,
      disabled: boolean,
      items: Customer[]
    }
) {

  function handleOnChange(customerId: Customer[keyof Customer]) {
    onValueChange('customerId', customerId)
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
      />
    </div>
  )
}