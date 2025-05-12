import type { ReactNode } from "react"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  icon: ReactNode
  change?: number
  description?: string
  className?: string
  trend?: "up" | "down" | "neutral"
  trendLabel?: string
}

export function MetricCard({
  title,
  value,
  icon,
  change,
  description,
  className,
  trend = "neutral",
  trendLabel,
}: MetricCardProps) {
  return (
    <Card className={cn("dashboard-metric-card overflow-hidden", className)}>
      <CardHeader className="card-header flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      </CardHeader>
      <CardContent className="card-content">
        <div className="metric-value">{value}</div>
        {change !== undefined && (
          <p className={cn("metric-change", change > 0 ? "text-success" : "text-destructive")}>
            {change > 0 ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
            {Math.abs(change)}% from last month
          </p>
        )}
        {trend && trendLabel && (
          <div
            className={cn(
              "flex items-center text-xs font-medium mt-1",
              trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {trend === "up" ? (
              <ArrowUpIcon className="mr-1 h-3 w-3" />
            ) : trend === "down" ? (
              <ArrowDownIcon className="mr-1 h-3 w-3" />
            ) : null}
            {trendLabel}
          </div>
        )}
        {description && <p className="metric-description">{description}</p>}
      </CardContent>
    </Card>
  )
}
