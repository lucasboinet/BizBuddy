'use server'

import prisma from "@/lib/prisma";
import { MonthAbbreviation, YearlyRevenue } from "@/types/customers";

export async function GetCustomerYearlyRevenue(customerId: string, currentYearRange: { start: Date, end: Date }): Promise<YearlyRevenue> {
  const monthAbbreviations: MonthAbbreviation[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Get monthly revenue data
  const monthlyData = await prisma.invoice.groupBy({
    by: ['createdAt'],
    where: {
      customerId: customerId,
      status: 'PAID',
      createdAt: {
        gte: currentYearRange.start,
        lte: currentYearRange.end,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const result = monthAbbreviations.map(month => ({
    month,
    revenue: 0,
  })) as YearlyRevenue;

  monthlyData.forEach((data) => {
    const monthIndex = new Date(data.createdAt).getMonth();
    result[monthIndex].revenue += data._sum.amount || 0;
  });

  return result;
}