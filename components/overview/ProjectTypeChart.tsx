"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DashboardStatTag } from "@/actions/GetDashboardStats"
import { useMemo } from "react"

export function ProjectTypeChart({ className, tags }: { className?: string, tags: DashboardStatTag[] }) {
  // const chartData = useMemo(() => tags.map((tag) => ({ category: tag.name, amount: tag._count.ProjectTag })), [tags])
  const chartData = useMemo(() => {
    const availableTags = Array(8).fill({ category: '', amount: 0 })
    tags.forEach((tag, index) => availableTags[index] = { category: tag.name, amount: tag._count.ProjectTag })
    return availableTags;
  }, [tags])

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
