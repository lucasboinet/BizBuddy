import { AppCustomer } from "@/types/customers";
import { format } from "date-fns";
import { CalendarIcon, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CustomerCard({ customer }: { customer: AppCustomer }) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <div className="flex justify-start items-center mb-4">
        <div className="text-gray-500 text-xs">
          ID: {customer.id}
        </div>
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-100">
          <Image
            src="/customer-placeholder.svg"
            width={100}
            height={100}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <Link href={`/customers/${customer.id}`}>
          <h3 className="hover:underline font-medium text-gray-800">{customer.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm">{customer.email}</p>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex gap-2 items-center text-gray-500">
          <CalendarIcon size={16} />
          <span className="text-sm">{format(customer.createdAt, 'MMM dd, yyyy')}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  )
}