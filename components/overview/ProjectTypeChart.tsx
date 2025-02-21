"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function ProjectTypeChart({ className }: { className?: string }) {
  const chartData = [
    { category: "Long-term", amount: 186 },
    { category: "Short-term", amount: 305 },
    { category: "Logo", amount: 237 },
    { category: "Web design", amount: 209 },
    { category: "React", amount: 214 },
    { category: "Vue", amount: 214 },
    { category: "Node", amount: 214 },
    { category: "Typescript", amount: 214 },
  ]
  const chartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className={className}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
