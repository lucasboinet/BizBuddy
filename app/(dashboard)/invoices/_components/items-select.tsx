import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InvoiceItem } from "@/types/invoices";
import { PlusIcon, XIcon } from "lucide-react";


export default function ItemSelect({ value, onValueChange }:
  {
    value: InvoiceItem[],
    onValueChange: (...event: any[]) => void,
  }
) {
  const handleItemChange = <K extends keyof InvoiceItem>(key: K, newValue: InvoiceItem[K], index: number) => {
    const items = [...value]
    items[index][key] = newValue;
    onValueChange([...items]);
  }

  const handleDeleteItem = (index: number) => {
    const items = [...value]
    items.splice(index, 1);
    onValueChange([...items]);
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-5 gap-2 mt-2">
        <span className="text-gray-400 text-xs col-span-3">Name</span>
        <span className="text-gray-400 text-xs">QTY</span>
        <span className="text-gray-400 text-xs">Rate</span>
      </div>
      {value.map((item, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 relative">
          <Input
            className="col-span-3"
            value={item.label}
            onChange={(e) => handleItemChange('label', e.target.value, index)}
            required
          />
          <Input
            value={item.quantity}
            type="number"
            onChange={(e) => handleItemChange('quantity', parseInt(e.target.value), index)}
          />
          <Input
            value={item.amount}
            type="number"
            onChange={(e) => handleItemChange('amount', parseFloat(e.target.value), index)}
          />
          {index !== 0 && (
            <Button
              type="button"
              variant="link"
              size="icon"
              className="absolute -right-10"
              onClick={() => handleDeleteItem(index)}
            >
              <XIcon />
            </Button>
          )}
        </div>
      ))}

      {value.length < 9 && (
        <Button
          variant="link"
          className="w-fit"
          onClick={() => onValueChange([...value, { label: '', quantity: 1, amount: 0 }])}
        >
          <PlusIcon />
          Add item
        </Button>
      )}
    </div>
  )
}