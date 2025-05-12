"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Download, UserPlus, Mail, Eye } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock customer data
const customers = [
  {
    id: "cus_1",
    name: "Acme Inc.",
    email: "billing@acme.com",
    plan: "Enterprise",
    usagePercent: 78,
    invoiceStatus: "paid",
    mrr: 499,
    joinedAt: "2023-01-15",
    avatar: "A",
  },
  {
    id: "cus_2",
    name: "Globex Corporation",
    email: "accounts@globex.com",
    plan: "Pro",
    usagePercent: 92,
    invoiceStatus: "pending",
    mrr: 199,
    joinedAt: "2023-02-20",
    avatar: "G",
  },
  {
    id: "cus_3",
    name: "Initech",
    email: "finance@initech.com",
    plan: "Basic",
    usagePercent: 45,
    invoiceStatus: "paid",
    mrr: 49,
    joinedAt: "2023-03-10",
    avatar: "I",
  },
  {
    id: "cus_4",
    name: "Umbrella Corporation",
    email: "billing@umbrella.com",
    plan: "Enterprise",
    usagePercent: 65,
    invoiceStatus: "overdue",
    mrr: 499,
    joinedAt: "2023-01-05",
    avatar: "U",
  },
  {
    id: "cus_5",
    name: "Stark Industries",
    email: "accounts@stark.com",
    plan: "Pro",
    usagePercent: 88,
    invoiceStatus: "paid",
    mrr: 199,
    joinedAt: "2023-04-15",
    avatar: "S",
  },
  {
    id: "cus_6",
    name: "Wayne Enterprises",
    email: "finance@wayne.com",
    plan: "Enterprise",
    usagePercent: 72,
    invoiceStatus: "paid",
    mrr: 499,
    joinedAt: "2023-02-28",
    avatar: "W",
  },
  {
    id: "cus_7",
    name: "Cyberdyne Systems",
    email: "billing@cyberdyne.com",
    plan: "Basic",
    usagePercent: 31,
    invoiceStatus: "pending",
    mrr: 49,
    joinedAt: "2023-05-01",
    avatar: "C",
  },
  {
    id: "cus_8",
    name: "Oscorp Industries",
    email: "accounts@oscorp.com",
    plan: "Pro",
    usagePercent: 95,
    invoiceStatus: "overdue",
    mrr: 199,
    joinedAt: "2023-03-22",
    avatar: "O",
  },
]

// Customer stats
const customerStats = [
  { title: "Total Customers", value: "3,290", change: 8.1 },
  { title: "Active Customers", value: "3,128", change: 5.3 },
  { title: "Customers at Risk", value: "162", change: -12.4 },
  { title: "Average MRR", value: "$103", change: 3.2 },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [planFilter, setPlanFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter customers based on search term and filters
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPlan = planFilter === "all" || customer.plan === planFilter

    const matchesStatus = statusFilter === "all" || customer.invoiceStatus === statusFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "risk" && customer.usagePercent > 85) ||
      (activeTab === "new" && new Date(customer.joinedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))

    return matchesSearch && matchesPlan && matchesStatus && matchesTab
  })

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="page-header">
          <div>
            <h1 className="page-title">Customers</h1>
            <p className="page-description">Manage and monitor your customer base</p>
          </div>
          <div className="page-actions">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {customerStats.map((stat, index) => (
            <Card key={index} className="dashboard-card">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                <div className="mt-2 flex items-baseline">
                  <div className="text-3xl font-semibold">{stat.value}</div>
                  <div className={`ml-2 text-sm font-medium ${stat.change > 0 ? "text-success" : "text-destructive"}`}>
                    {stat.change > 0 ? "+" : ""}
                    {stat.change}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="all">All Customers</TabsTrigger>
                <TabsTrigger value="risk">At Risk</TabsTrigger>
                <TabsTrigger value="new">New (30d)</TabsTrigger>
              </TabsList>
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                <div className="relative w-full md:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search customers..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="All Plans" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Pro">Pro</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <Card className="data-table-container">
                <Table className="data-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Invoice Status</TableHead>
                      <TableHead className="text-right">MRR</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-border">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=32&width=32&query=${customer.name}`}
                                alt={customer.name}
                              />
                              <AvatarFallback>{customer.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">{customer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.plan === "Enterprise"
                                ? "default"
                                : customer.plan === "Pro"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="font-medium"
                          >
                            {customer.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex w-full max-w-xs flex-col gap-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium">{customer.usagePercent}%</span>
                              {customer.usagePercent >= 90 && (
                                <span className="text-destructive font-medium">Near limit</span>
                              )}
                            </div>
                            <Progress
                              value={customer.usagePercent}
                              className={
                                customer.usagePercent >= 90
                                  ? "bg-destructive/20 text-destructive"
                                  : customer.usagePercent >= 75
                                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500"
                                    : ""
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.invoiceStatus === "paid"
                                ? "success"
                                : customer.invoiceStatus === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="badge-success badge-destructive badge-secondary"
                          >
                            {customer.invoiceStatus.charAt(0).toUpperCase() + customer.invoiceStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${customer.mrr}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Edit customer</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Delete customer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
            <TabsContent value="risk" className="mt-0">
              <Card className="data-table-container">
                <Table className="data-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Invoice Status</TableHead>
                      <TableHead className="text-right">MRR</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-border">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=32&width=32&query=${customer.name}`}
                                alt={customer.name}
                              />
                              <AvatarFallback>{customer.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">{customer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.plan === "Enterprise"
                                ? "default"
                                : customer.plan === "Pro"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="font-medium"
                          >
                            {customer.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex w-full max-w-xs flex-col gap-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium">{customer.usagePercent}%</span>
                              {customer.usagePercent >= 90 && (
                                <span className="text-destructive font-medium">Near limit</span>
                              )}
                            </div>
                            <Progress
                              value={customer.usagePercent}
                              className={
                                customer.usagePercent >= 90
                                  ? "bg-destructive/20 text-destructive"
                                  : customer.usagePercent >= 75
                                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500"
                                    : ""
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.invoiceStatus === "paid"
                                ? "success"
                                : customer.invoiceStatus === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="badge-success badge-destructive badge-secondary"
                          >
                            {customer.invoiceStatus.charAt(0).toUpperCase() + customer.invoiceStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${customer.mrr}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Edit customer</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Delete customer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
            <TabsContent value="new" className="mt-0">
              <Card className="data-table-container">
                <Table className="data-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Invoice Status</TableHead>
                      <TableHead className="text-right">MRR</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-border">
                              <AvatarImage
                                src={`/abstract-geometric-shapes.png?height=32&width=32&query=${customer.name}`}
                                alt={customer.name}
                              />
                              <AvatarFallback>{customer.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">{customer.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.plan === "Enterprise"
                                ? "default"
                                : customer.plan === "Pro"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="font-medium"
                          >
                            {customer.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex w-full max-w-xs flex-col gap-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium">{customer.usagePercent}%</span>
                              {customer.usagePercent >= 90 && (
                                <span className="text-destructive font-medium">Near limit</span>
                              )}
                            </div>
                            <Progress
                              value={customer.usagePercent}
                              className={
                                customer.usagePercent >= 90
                                  ? "bg-destructive/20 text-destructive"
                                  : customer.usagePercent >= 75
                                    ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500"
                                    : ""
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              customer.invoiceStatus === "paid"
                                ? "success"
                                : customer.invoiceStatus === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="badge-success badge-destructive badge-secondary"
                          >
                            {customer.invoiceStatus.charAt(0).toUpperCase() + customer.invoiceStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${customer.mrr}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Edit customer</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                Delete customer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
