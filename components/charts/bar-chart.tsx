"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

interface BarChartProps {
  title: string
  description?: string
  data: any[]
  categories: {
    [key: string]: {
      label: string
      color: string
    }
  }
  index: string
  className?: string
}

export function BarChartCard({ title, description, data, categories, index, className }: BarChartProps) {
  return (
    <Card className={cn("dashboard-card overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <ChartContainer config={categories} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              <XAxis
                dataKey={index}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => value.toString()}
                className="text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs"
                tickFormatter={(value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: "10px" }}
              />
              {Object.keys(categories).map((key) => (
                <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={[4, 4, 0, 0]} barSize={30} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
