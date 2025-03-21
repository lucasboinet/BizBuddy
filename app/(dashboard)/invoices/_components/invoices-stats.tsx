import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppInvoice, INVOICE_STATUS } from "@/types/invoices";
import { Clock, CreditCard, DollarSign, Percent } from "lucide-react";
import { useMemo } from "react";

export default function InvoicesStats({ invoices }: { invoices: AppInvoice[] }) {
  const stats = useMemo(() => ({
    totalRevenue: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paidRevenue: invoices.filter(inv => inv.status === INVOICE_STATUS.PAID).reduce((sum, inv) => sum + inv.amount, 0),
    paidCount: invoices.filter(inv => inv.status === INVOICE_STATUS.PAID).length,
    pendingCount: invoices.filter(inv => inv.status === INVOICE_STATUS.SENT).length,
    overdueCount: invoices.filter(inv => inv.status === INVOICE_STATUS.REFUSED).length,
    paidRate: (invoices.filter(inv => inv.status === INVOICE_STATUS.PAID).length / invoices.length) * 100,
    avgInvoiceValue: invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length
  }), [invoices]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2 pt-6">
          <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold text-primary">${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
            <span><span className="text-green-600 font-medium">${stats.paidRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> collected</span>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 pt-6">
          <CardTitle className="text-sm font-medium text-gray-500">Payment Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold text-primary">{stats.paidRate.toFixed(1)}%</h3>
          <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
            <span><span className="text-green-600 font-medium">{stats.paidCount}</span> paid of <span>{invoices.length}</span> invoices</span>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Percent className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 pt-6">
          <CardTitle className="text-sm font-medium text-gray-500">Average Value</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold text-primary">${stats.avgInvoiceValue.toFixed(2)}</h3>
          <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
            <span>Across <span className="text-primary/10 font-medium">{invoices.length}</span> total invoices</span>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 pt-6">
          <CardTitle className="text-sm font-medium text-gray-500">Pending & Overdue</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold text-primary">{stats.pendingCount + stats.overdueCount}</h3>
          <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
            <span><span className="text-yellow-600 font-medium">{stats.pendingCount}</span> pending, <span className="text-red-600 font-medium">{stats.overdueCount}</span> overdue</span>
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}