import { DashboardStats } from '@/actions/GetDashboardStats'
import { ProjectTypeChart } from '@/components/overview/ProjectTypeChart'
import RevenueChart from '@/components/overview/RevenueChart'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CircleDollarSign, FileText, Home, TrendingUp, Users } from 'lucide-react'
import { useMemo } from 'react'

interface Props {
  stats: DashboardStats,
}

export default function DashboardPage({ stats }: Props) {
  const revenueDiffThisYear = useMemo(() => {
    if (stats.currentYearRevenue === 0) return `-${stats.lastYearRevenue}%`;
    if (stats.lastYearRevenue === 0) return `+${stats.currentYearRevenue}%`;
    const ratio = ((stats.currentYearRevenue - stats.lastYearRevenue) / stats.lastYearRevenue) * 100;
    return `${ratio > 0 ? '+' : '-'}${ratio}%`;
  }, [stats]);

  return (
    <div className='space-y-4'>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.currentYearRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{revenueDiffThisYear} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActiveProjects}</div>
            <p className="text-xs text-muted-foreground">{stats.projectsDueThisWeek} due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.pendingInvoicesAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingInvoicesCount} invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">{stats.customersThisMonth} new this month</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 grid-cols-1 lg:grid-cols-7'>
        <Card className='col-span-1 lg:col-span-4'>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Revenue for each month of the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart chartData={stats.revenuesByMonth} className="h-96 w-full" />
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Over the year
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>Projects types</CardTitle>
            <CardDescription>Repartition of projects by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectTypeChart className="h-96 w-full" />
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Last 5 most used categories
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Over the year
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
        <Card className="col-span-1 md:col-span-4 lg:col-span-5">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Latest transactions and invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Tech Corp</TableCell>
                  <TableCell>$2,400</TableCell>
                  <TableCell>https://</TableCell>
                  <TableCell>
                    <Badge variant='danger'>Refused</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tech Corp</TableCell>
                  <TableCell>$2,300</TableCell>
                  <TableCell>https://</TableCell>
                  <TableCell>
                    <Badge variant='disabled'>Cancelled</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Design Studio</TableCell>
                  <TableCell>$1,800</TableCell>
                  <TableCell>https://</TableCell>
                  <TableCell>
                    <Badge variant='warning'>Pending</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marketing Inc</TableCell>
                  <TableCell>$3,200</TableCell>
                  <TableCell>https://</TableCell>
                  <TableCell>
                    <Badge variant='success'>Paid</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-3 lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current active projects progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Website Redesign</div>
                <div>75%</div>
              </div>
              <Progress value={75} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Mobile App Development</div>
                <div>50%</div>
              </div>
              <Progress value={50} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium">Brand Guidelines</div>
                <div>90%</div>
              </div>
              <Progress value={90} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}