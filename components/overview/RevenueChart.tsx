'use client'

import { DashboardStats } from "@/actions/GetDashboardStats"
import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer
} from "@/components/ui/chart"
import { CartesianGrid, XAxis, LineChart, Line } from "recharts"

function RevenueChart({ className, chartData }: { className?: string, chartData: DashboardStats["revenuesByMonth"] }) {
  const chartConfig = {
    income: {
      label: "Income",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className={className}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="income"
          type="bump"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={{
            fill: "hsl(var(--chart-1))",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default RevenueChart;