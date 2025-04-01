'use server'

import prisma from "@/lib/prisma";
import { retrieveSession } from "@/lib/sessions";
import { INVOICE_STATUS } from "@/types/invoices";
import { PROJECT_STATUS } from "@/types/projects";
import { Tag } from "@prisma/client";
import { endOfWeek, endOfYear, startOfMonth, startOfWeek, startOfYear, subDays } from "date-fns";

export type DashboardStats = {
  totalCustomers: number,
  customersThisMonth: number,
  pendingInvoicesCount: number,
  pendingInvoicesAmount: number,
  totalActiveProjects: number,
  projectsDueThisWeek: number,
  currentYearRevenue: number,
  lastYearRevenue: number,
  revenuesByMonth: { month: string, income: number }[],
  popularProjectsTags: Tag[]
}

export async function GetDashboardStats(): Promise<DashboardStats> {
  const session = await retrieveSession();

  if (!session?.sessionId) {
    throw new Error("Unauthorized");
  }

  const totalCustomers = await prisma.customer.count();
  const customersThisMonth = await prisma.customer.count({
    where: {
      createdAt: {
        gte: startOfMonth(new Date()),
        lte: new Date(),
      },
    }
  })

  const pendingInvoices = await prisma.invoice.findMany({
    where: {
      status: INVOICE_STATUS.SENT,
    }
  })

  const pendingInvoicesCount = pendingInvoices.length;
  const pendingInvoicesAmount = pendingInvoices.reduce((acc, invoice) => acc + invoice.amount, 0);

  const totalActiveProjects = await prisma.project.count({
    where: {
      status: PROJECT_STATUS.IN_PROGRESS
    }
  });
  const projectsDueThisWeek = await prisma.project.count({
    where: {
      dueAt: {
        gte: startOfWeek(new Date()),
        lte: endOfWeek(new Date()),
      },
    }
  })

  const currentYearRevenue = await prisma.invoice.aggregate({
    where: {
      dueDate: {
        gte: startOfYear(new Date()),
        lte: new Date(),
      }
    },
    _sum: {
      amount: true,
    }
  })

  const lastYearEnd = subDays(startOfYear(new Date()), 1);
  const lastYearRevenue = await prisma.invoice.aggregate({
    where: {
      dueDate: {
        gte: startOfYear(lastYearEnd),
        lte: endOfYear(lastYearEnd),
      }
    },
    _sum: {
      amount: true,
    },
  })

  const groupedRevenues = await prisma.invoice.groupBy({
    by: ['dueDate'],
    where: {
      dueDate: {
        gte: startOfYear(new Date()),
        lte: endOfYear(new Date()),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const revenuesByMonth = months.map((month, index) => {
    const monthData = groupedRevenues
      .filter(invoice => new Date(invoice.dueDate).getMonth() === index)
      .reduce((sum, invoice) => sum + (invoice._sum.amount || 0), 0);

    return { month, income: monthData };
  });

  // const popularProjectsTags = await prisma.tag.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     _count: {
  //       select: {
  //         projects: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     projects: {
  //       _count: 'desc',
  //     },
  //   },
  //   take: 8,
  // });

  return {
    totalCustomers,
    customersThisMonth,
    pendingInvoicesCount,
    pendingInvoicesAmount,
    totalActiveProjects,
    projectsDueThisWeek,
    currentYearRevenue: currentYearRevenue._sum.amount || 0,
    lastYearRevenue: lastYearRevenue._sum.amount || 0,
    revenuesByMonth,
    popularProjectsTags: [],
  }
}