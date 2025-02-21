'use client'

import {
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer
} from "@/components/ui/chart"  
import { CartesianGrid, XAxis, LineChart, Line } from "recharts"

function RevenueChart({ className }: { className?: string }) {
  const chartData = [
    { month: "January", income: 186 },
    { month: "February", income: 305 },
    { month: "March", income: 237 },
    { month: "April", income: 73 },
    { month: "May", income: 209 },
    { month: "June", income: 214 },
    { month: "July", income: 300 },
    { month: "August", income: 340 },
    { month: "September", income: 250 },
    { month: "October", income: 307 },
    { month: "November", income: 500 },
    { month: "December", income: 110 },
  ]
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
          type="natural"
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