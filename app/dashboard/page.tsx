import { DollarSign, Users, ArrowUpRight, ArrowDownRight, TrendingUp, UserPlus, AlertTriangle } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { MetricCard } from "@/components/charts/metric-card"
import { LineChartCard } from "@/components/charts/line-chart"
import { BarChartCard } from "@/components/charts/bar-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Mock data for MRR
const mrrData = [
  { month: "Jan", mrr: 12000 },
  { month: "Feb", mrr: 14000 },
  { month: "Mar", mrr: 16000 },
  { month: "Apr", mrr: 18000 },
  { month: "May", mrr: 20000 },
  { month: "Jun", mrr: 22000 },
  { month: "Jul", mrr: 24000 },
  { month: "Aug", mrr: 26000 },
  { month: "Sep", mrr: 28000 },
  { month: "Oct", mrr: 30000 },
  { month: "Nov", mrr: 32000 },
  { month: "Dec", mrr: 34000 },
]

// Mock data for customer growth
const customerData = [
  { month: "Jan", new: 120, churned: 20, total: 1200 },
  { month: "Feb", new: 140, churned: 25, total: 1315 },
  { month: "Mar", new: 160, churned: 30, total: 1445 },
  { month: "Apr", new: 180, churned: 35, total: 1590 },
  { month: "May", new: 200, churned: 40, total: 1750 },
  { month: "Jun", new: 220, churned: 45, total: 1925 },
  { month: "Jul", new: 240, churned: 50, total: 2115 },
  { month: "Aug", new: 260, churned: 55, total: 2320 },
  { month: "Sep", new: 280, churned: 60, total: 2540 },
  { month: "Oct", new: 300, churned: 65, total: 2775 },
  { month: "Nov", new: 320, churned: 70, total: 3025 },
  { month: "Dec", new: 340, churned: 75, total: 3290 },
]

// Mock data for usage spikes
const usageData = [
  { day: "Mon", api: 5200, storage: 1200, bandwidth: 3500 },
  { day: "Tue", api: 6100, storage: 1300, bandwidth: 3700 },
  { day: "Wed", api: 8500, storage: 1400, bandwidth: 4200 },
  { day: "Thu", api: 7200, storage: 1500, bandwidth: 3900 },
  { day: "Fri", api: 6800, storage: 1600, bandwidth: 3800 },
  { day: "Sat", api: 4500, storage: 1700, bandwidth: 3000 },
  { day: "Sun", api: 4000, storage: 1800, bandwidth: 2800 },
]

// Top customers data
const topCustomers = [
  { name: "Acme Inc.", plan: "Enterprise", mrr: 499, growth: 12 },
  { name: "Globex Corporation", plan: "Pro", mrr: 199, growth: 8 },
  { name: "Wayne Enterprises", plan: "Enterprise", mrr: 499, growth: 15 },
  { name: "Stark Industries", plan: "Pro", mrr: 199, growth: 5 },
]

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="page-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-description">Overview of your SaaS metrics and performance</p>
          </div>
          <div className="page-actions">
            <Button variant="outline">Export Report</Button>
            <Button>View Analytics</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Monthly Recurring Revenue"
            value="$34,000"
            icon={<DollarSign className="h-4 w-4" />}
            change={6.2}
            trend="up"
            trendLabel="Growing steadily"
          />
          <MetricCard
            title="Total Customers"
            value="3,290"
            icon={<Users className="h-4 w-4" />}
            change={8.1}
            trend="up"
            trendLabel="Above target"
          />
          <MetricCard
            title="Churn Rate"
            value="2.3%"
            icon={<ArrowDownRight className="h-4 w-4" />}
            change={-0.5}
            trend="down"
            trendLabel="Improving"
          />
          <MetricCard
            title="Average Revenue Per User"
            value="$103"
            icon={<ArrowUpRight className="h-4 w-4" />}
            change={3.2}
            trend="up"
            trendLabel="Increasing"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <LineChartCard
            title="Monthly Recurring Revenue"
            description="MRR growth over the past 12 months"
            data={mrrData}
            categories={{
              mrr: {
                label: "MRR",
                color: "hsl(var(--chart-1))",
              },
            }}
            index="month"
          />
          <LineChartCard
            title="Customer Growth"
            description="Customer acquisition and churn over time"
            data={customerData}
            categories={{
              new: {
                label: "New Customers",
                color: "hsl(var(--chart-1))",
              },
              churned: {
                label: "Churned Customers",
                color: "hsl(var(--chart-2))",
              },
              total: {
                label: "Total Customers",
                color: "hsl(var(--chart-3))",
              },
            }}
            index="month"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="dashboard-card md:col-span-2">
            <CardHeader>
              <CardTitle>Usage Metrics</CardTitle>
              <CardDescription>API calls, storage, and bandwidth usage over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChartCard
                title=""
                data={usageData}
                categories={{
                  api: {
                    label: "API Calls",
                    color: "hsl(var(--chart-1))",
                  },
                  storage: {
                    label: "Storage (MB)",
                    color: "hsl(var(--chart-2))",
                  },
                  bandwidth: {
                    label: "Bandwidth (MB)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                index="day"
                className="border-0 shadow-none"
              />
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>Customers with highest MRR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{customer.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={customer.plan === "Enterprise" ? "default" : "secondary"}>
                          {customer.plan}
                        </Badge>
                        <span className="text-sm text-muted-foreground">${customer.mrr}/mo</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">{customer.growth}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Recent Signups</CardTitle>
              <CardDescription>New customers in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <UserPlus className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">New Customer #{index + 1}</p>
                      <p className="text-sm text-muted-foreground">Signed up for Pro Plan</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {index === 0 ? "Today" : index === 1 ? "Yesterday" : "3 days ago"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Resource Usage Alerts</CardTitle>
              <CardDescription>Customers approaching usage limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Globex Corporation", usage: 92, resource: "API Calls" },
                  { name: "Oscorp Industries", usage: 95, resource: "Storage" },
                  { name: "Stark Industries", usage: 88, resource: "Bandwidth" },
                ].map((alert, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{alert.name}</p>
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-500 dark:border-amber-800/30"
                      >
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Near Limit
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>{alert.resource}</span>
                      <span className="font-medium">{alert.usage}%</span>
                    </div>
                    <Progress value={alert.usage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
