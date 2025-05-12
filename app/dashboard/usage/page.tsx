"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Calendar,
  BarChart3,
  Database,
  Wifi,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChartCard } from "@/components/charts/bar-chart"

// Mock usage data
const usageData = [
  {
    id: "usage_1",
    customerId: "cus_1",
    customerName: "Acme Inc.",
    type: "api",
    endpoint: "/api/v1/users",
    method: "GET",
    statusCode: 200,
    responseTime: 120,
    timestamp: "2023-06-01T10:15:30Z",
    size: 2.4,
  },
  {
    id: "usage_2",
    customerId: "cus_1",
    customerName: "Acme Inc.",
    type: "storage",
    operation: "upload",
    fileType: "image/jpeg",
    size: 5.2,
    timestamp: "2023-06-01T11:20:45Z",
  },
  {
    id: "usage_3",
    customerId: "cus_2",
    customerName: "Globex Corporation",
    type: "api",
    endpoint: "/api/v1/products",
    method: "POST",
    statusCode: 201,
    responseTime: 180,
    timestamp: "2023-06-01T12:30:15Z",
    size: 1.8,
  },
  {
    id: "usage_4",
    customerId: "cus_3",
    customerName: "Initech",
    type: "bandwidth",
    operation: "download",
    size: 15.7,
    timestamp: "2023-06-01T13:45:20Z",
  },
  {
    id: "usage_5",
    customerId: "cus_2",
    customerName: "Globex Corporation",
    type: "api",
    endpoint: "/api/v1/analytics",
    method: "GET",
    statusCode: 200,
    responseTime: 250,
    timestamp: "2023-06-01T14:10:05Z",
    size: 8.3,
  },
  {
    id: "usage_6",
    customerId: "cus_4",
    customerName: "Umbrella Corporation",
    type: "storage",
    operation: "delete",
    fileType: "application/pdf",
    size: 3.1,
    timestamp: "2023-06-01T15:25:40Z",
  },
  {
    id: "usage_7",
    customerId: "cus_5",
    customerName: "Stark Industries",
    type: "api",
    endpoint: "/api/v1/auth",
    method: "POST",
    statusCode: 401,
    responseTime: 90,
    timestamp: "2023-06-01T16:30:10Z",
    size: 0.5,
  },
  {
    id: "usage_8",
    customerId: "cus_1",
    customerName: "Acme Inc.",
    type: "bandwidth",
    operation: "upload",
    size: 22.4,
    timestamp: "2023-06-01T17:40:25Z",
  },
]

// Mock usage summary data
const usageSummary = [
  { day: "Mon", api: 5200, storage: 1200, bandwidth: 3500 },
  { day: "Tue", api: 6100, storage: 1300, bandwidth: 3700 },
  { day: "Wed", api: 8500, storage: 1400, bandwidth: 4200 },
  { day: "Thu", api: 7200, storage: 1500, bandwidth: 3900 },
  { day: "Fri", api: 6800, storage: 1600, bandwidth: 3800 },
  { day: "Sat", api: 4500, storage: 1700, bandwidth: 3000 },
  { day: "Sun", api: 4000, storage: 1800, bandwidth: 2800 },
]

// Usage stats
const usageStats = [
  {
    title: "API Calls",
    value: "42,300",
    change: 8.5,
    icon: BarChart3,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    title: "Storage Used",
    value: "10.2 GB",
    change: 12.3,
    icon: Database,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    title: "Bandwidth",
    value: "24.6 GB",
    change: 5.7,
    icon: Wifi,
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    title: "Total Logs",
    value: "8,432",
    change: 15.2,
    icon: FileText,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
]

export default function UsagePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [customerFilter, setCustomerFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [date, setDate] = useState(new Date())

  // Filter usage data based on search term and filters
  const filteredUsage = usageData.filter((usage) => {
    const matchesSearch =
      usage.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (usage.endpoint && usage.endpoint.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (usage.method && usage.method.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCustomer = customerFilter === "all" || usage.customerId === customerFilter

    const matchesType = typeFilter === "all" || usage.type === typeFilter

    return matchesSearch && matchesCustomer && matchesType
  })

  // Get unique customers for filter
  const customers = [...new Set(usageData.map((usage) => usage.customerId))].map((id) => {
    const customer = usageData.find((usage) => usage.customerId === id)
    return {
      id,
      name: customer.customerName,
    }
  })

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "api":
        return <BarChart3 className="h-4 w-4" />
      case "storage":
        return <Database className="h-4 w-4" />
      case "bandwidth":
        return <Wifi className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Get operation icon
  const getOperationIcon = (type, operation) => {
    if (type === "bandwidth") {
      return operation === "download" ? (
        <ArrowDownToLine className="h-4 w-4" />
      ) : (
        <ArrowUpFromLine className="h-4 w-4" />
      )
    }
    return null
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="page-header">
          <div>
            <h1 className="page-title">Usage Logs</h1>
            <p className="page-description">Monitor and analyze resource usage across your platform</p>
          </div>
          <div className="page-actions">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              {format(date, "MMM d, yyyy")}
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {usageStats.map((stat, index) => (
            <Card key={index} className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                    <div className="mt-2 flex items-baseline">
                      <div className="text-3xl font-semibold">{stat.value}</div>
                      <div className="ml-2 text-sm font-medium text-success">+{stat.change}%</div>
                    </div>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Resource usage over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartCard
              title=""
              data={usageSummary}
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

        <Tabs defaultValue="all">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
              <TabsList>
                <TabsTrigger value="all">All Logs</TabsTrigger>
                <TabsTrigger value="api">API Calls</TabsTrigger>
                <TabsTrigger value="storage">Storage</TabsTrigger>
                <TabsTrigger value="bandwidth">Bandwidth</TabsTrigger>
              </TabsList>
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                <div className="relative w-full md:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search logs..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={customerFilter} onValueChange={setCustomerFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Customers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {format(date, "MMM d, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="data-table-container">
              <Table className="data-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsage.map((usage) => (
                    <TableRow key={usage.id}>
                      <TableCell>
                        <div className="font-medium">{usage.customerName}</div>
                        <div className="text-xs text-muted-foreground">ID: {usage.customerId}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            usage.type === "api"
                              ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30"
                              : usage.type === "storage"
                                ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800/30"
                                : "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30"
                          }
                        >
                          <div className="flex items-center gap-1">
                            {getTypeIcon(usage.type)}
                            <span>{usage.type.toUpperCase()}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {usage.type === "api" ? (
                          <div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="font-mono text-xs">
                                {usage.method}
                              </Badge>
                              <span className="text-sm font-medium">{usage.endpoint}</span>
                            </div>
                            <div className="mt-1 flex items-center space-x-2">
                              <Badge
                                variant={
                                  usage.statusCode >= 200 && usage.statusCode < 300
                                    ? "success"
                                    : usage.statusCode >= 400
                                      ? "destructive"
                                      : "secondary"
                                }
                                className="badge-success badge-destructive badge-secondary"
                              >
                                {usage.statusCode}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{usage.responseTime}ms</span>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-1.5 text-sm font-medium">
                              {getOperationIcon(usage.type, usage.operation)}
                              <span>{usage.operation.charAt(0).toUpperCase() + usage.operation.slice(1)}</span>
                            </div>
                            {usage.fileType && (
                              <div className="mt-1 text-xs text-muted-foreground">{usage.fileType}</div>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {usage.size} {usage.type === "api" ? "KB" : "MB"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {new Date(usage.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(usage.timestamp).toLocaleDateString()}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
