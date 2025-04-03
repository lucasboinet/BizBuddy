import { AppInvoice, INVOICE_STATUS } from "@/types/invoices";
import { Clock, CreditCard, DollarSign, Percent } from "lucide-react";
import { useMemo } from "react";
import InvoiceStat from "./invoice-stat";

export default function InvoicesStats({ invoices }: { invoices: AppInvoice[] }) {
  const stats = useMemo(() => ({
    totalValue: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    totalRevenue: invoices.filter(inv => inv.status === INVOICE_STATUS.PAID).reduce((sum, inv) => sum + inv.amount, 0),
    paidCount: invoices.filter(inv => inv.status === INVOICE_STATUS.PAID).length,
    pendingCount: invoices.filter(inv => inv.status === INVOICE_STATUS.SENT).length,
    overdueCount: invoices.filter(inv => inv.status === INVOICE_STATUS.REFUSED).length,
    paidRate: (invoices.filter(inv => inv.status === INVOICE_STATUS.PAID).length / (invoices.length || 1)) * 100,
    avgInvoiceValue: invoices.reduce((sum, inv) => sum + inv.amount, 0) / (invoices.length || 1)
  }), [invoices]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <InvoiceStat
        icon={DollarSign}
        title="Total Value"
        value={`$${stats.totalValue.toLocaleString()}`}
        subtitle={
          <>
            <span className="text-green-600 font-medium">${stats.avgInvoiceValue.toLocaleString()}</span> average
          </>
        }
      />

      <InvoiceStat
        icon={CreditCard}
        title="Total Revenue"
        value={`$${stats.totalRevenue.toLocaleString()}`}
        subtitle={
          <>
            <span className="text-green-600 font-medium">{stats.paidCount}</span> paid of <span>{invoices.length}</span> invoices
          </>
        }
      />

      <InvoiceStat
        icon={Clock}
        title="Pending Value"
        value={`$${(stats.totalValue - stats.totalRevenue).toLocaleString()}`}
        subtitle={
          <>
            Across <span className="text-primary/10 font-medium">{invoices.length}</span> total invoices
          </>
        }
      />

      <InvoiceStat
        icon={Percent}
        title="Payment Rate"
        value={`${stats.paidRate.toFixed(1)}%`}
        subtitle={
          <>
            <span className="text-green-600 font-medium">{stats.paidCount}</span> paid of <span>{invoices.length}</span> invoices
          </>
        }
      />
    </div>
  )
}