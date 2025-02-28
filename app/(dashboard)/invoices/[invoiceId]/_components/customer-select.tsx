'use client'

import ComboBox from "@/components/ui/combobox";
import { Customer } from "@prisma/client";
import { useState } from "react";

export default function CustomerSelect({ form }: { form: any }) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();

  async function searchCustomers(query: string): Promise<Customer[]> {
    if (query === '') return new Promise((resolve) => resolve([]));

    return fetch(
      `/invoices/search?query=${query}`
    )
      .then((res) => res.json())
      .then((data) => data);
  }

  function handleOnChange(customer: Customer) {
    setSelectedCustomer(customer)
    form.setValue('customerId', customer.id)
  }

  return (
    <div>
      <ComboBox<Customer>
        title="Invoice"
        valueKey="name"
        value={selectedCustomer}
        searchFn={searchCustomers}
        renderText={(customer) => `${customer.name}`}
        onChange={handleOnChange}
      />
    </div>
  )
}