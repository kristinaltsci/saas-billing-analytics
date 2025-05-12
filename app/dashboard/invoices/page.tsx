"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  MoreHorizontal,
  CreditCard,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock invoice data
const invoices = [
  {
    id: "INV-001",
    customerId: "cus_1",
    customerName: "Acme Inc.",
    amount: 499,
    status: "paid",
    date: "2023-06-01",
    dueDate: "2023-06-15",
    items: [{ description: "Enterprise Plan - Monthly", quantity: 1, unitPrice: 499, total: 499 }],
    avatar: "A",
  },
  {
    id: "INV-002",
    customerId: "cus_2",
    customerName: "Globex Corporation",
    amount: 199,
    status: "pending",
    date: "2023-06-01",
    dueDate: "2023-06-15",
    items: [{ description: "Pro Plan - Monthly", quantity: 1, unitPrice: 199, total: 199 }],
    avatar: "G",
  },
  {
    id: "INV-003",
    customerId: "cus_3",
    customerName: "Initech",
    amount: 49,
    status: "paid",
    date: "2023-06-01",
    dueDate: "2023-06-15",
    items: [{ description: "Basic Plan - Monthly", quantity: 1, unitPrice: 49, total: 49 }],
    avatar: "I",
  },
  {
    id: "INV-004",
    customerId: "cus_4",
    customerName: "Umbrella Corporation",
    amount: 499,
    status: "overdue",
    date: "2023-05-01",
    dueDate: "2023-05-15",
    items: [{ description: "Enterprise Plan - Monthly", quantity: 1, unitPrice: 499, total: 499 }],
    avatar: "U",
  },
  {
    id: "INV-005",
    customerId: "cus_5",
    customerName: "Stark Industries",
    amount: 199,
    status: "paid",
    date: "2023-06-01",
    dueDate: "2023-06-15",
    items: [{ description: "Pro Plan - Monthly", quantity: 1, unitPrice: 199, total: 199 }],
    avatar: "S",
  },
  {
    id: "INV-006",
    customerId: "cus_6",
    customerName: "Wayne Enterprises",
    amount: 499,
    status: "paid",
    date: "2023-06-01",
    dueDate: "2023-06-15",
    items: [{ description: "Enterprise Plan - Monthly", quantity: 1, unitPrice: 499, total: 499 }],
    avatar: "W",
  },
  {
    id: "INV-007",
    customerId: "cus_7",
    customerName: "Cyberdyne Systems",
    amount: 49,
    status: "pending",
    date: "2023-06-01",
    dueDate: "2023-06-15",
    items: [{ description: "Basic Plan - Monthly", quantity: 1, unitPrice: 49, total: 49 }],
    avatar: "C",
  },
  {
    id: "INV-008",
    customerId: "cus_8",
    customerName: "Oscorp Industries",
    amount: 199,
    status: "overdue",
    date: "2023-05-01",
    dueDate: "2023-05-15",
    items: [{ description: "Pro Plan - Monthly", quantity: 1, unitPrice: 199, total: 199 }],
    avatar: "O",
  },
]

// Invoice stats
const invoiceStats = [
  {
    title: "Total Revenue",
    value: "$2,192",
    change: 12.5,
    icon: CreditCard,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    title: "Pending Amount",
    value: "$248",
    change: -5.2,
    icon: Clock,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    title: "Overdue Amount",
    value: "$698",
    change: 8.1,
    icon: AlertCircle,
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  {
    title: "Paid Invoices",
    value: "5",
    change: 15.3,
    icon: CheckCircle,
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
]

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Filter invoices based on search term and status filter
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "paid" && invoice.status === "paid") ||
      (activeTab === "pending" && invoice.status === "pending") ||
      (activeTab === "overdue" && invoice.status === "overdue")

    return matchesSearch && matchesStatus && matchesTab
  })

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setIsDialogOpen(true)
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="page-header">
          <div>
            <h1 className="page-title">Invoices</h1>
            <p className="page-description">Manage and track customer invoices</p>
          </div>
          <div className="page-actions">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Filter by Date
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {invoiceStats.map((stat, index) => (
            <Card key={index} className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                    <div className="mt-2 flex items-baseline">
                      <div className="text-3xl font-semibold">{stat.value}</div>
                      <div
                        className={`ml-2 text-sm font-medium ${stat.change > 0 ? "text-success" : "text-destructive"}`}
                      >
                        {stat.change > 0 ? "+" : ""}
                        {stat.change}%
                      </div>
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

        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
              <TabsList>
                <TabsTrigger value="all">All Invoices</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                <div className="relative w-full md:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search invoices..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
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

            <Card className="data-table-container">
              <Table className="data-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-border">
                            <AvatarImage
                              src={`/abstract-geometric-shapes.png?height=32&width=32&query=${invoice.customerName}`}
                              alt={invoice.customerName}
                            />
                            <AvatarFallback>{invoice.avatar}</AvatarFallback>
                          </Avatar>
                          <span>{invoice.customerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === "paid"
                              ? "success"
                              : invoice.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                          className="badge-success badge-destructive badge-secondary"
                        >
                          <div className="flex items-center gap-1">
                            {getStatusIcon(invoice.status)}
                            <span>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell className="text-right font-medium">${invoice.amount}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Send to email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice {selectedInvoice?.id}</DialogTitle>
            <DialogDescription>Invoice details for {selectedInvoice?.customerName}</DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">INVOICE</h2>
                      <p className="text-muted-foreground">#{selectedInvoice.id}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="font-bold">SaaS Analytics Inc.</h3>
                  <p>123 SaaS Street</p>
                  <p>San Francisco, CA 94103</p>
                  <p>billing@saasanalytics.com</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Bill To:</h4>
                  <p className="font-medium">{selectedInvoice.customerName}</p>
                  <p className="text-sm">Customer ID: {selectedInvoice.customerId}</p>
                </div>
                <div className="space-y-1 text-right">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium text-muted-foreground text-left">Invoice Date:</span>
                    <span>{selectedInvoice.date}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium text-muted-foreground text-left">Due Date:</span>
                    <span>{selectedInvoice.dueDate}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium text-muted-foreground text-left">Status:</span>
                    <Badge
                      variant={
                        selectedInvoice.status === "paid"
                          ? "success"
                          : selectedInvoice.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="badge-success badge-destructive badge-secondary justify-center"
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(selectedInvoice.status)}
                        <span>{selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}</span>
                      </div>
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.unitPrice}</TableCell>
                        <TableCell className="text-right">${item.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8 flex justify-end">
                <div className="w-1/3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${selectedInvoice.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-muted-foreground">Tax (0%):</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-lg font-bold">${selectedInvoice.amount}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                <p>Thank you for your business!</p>
                <p>Payment terms: Net 15 days. Please include the invoice number in your payment.</p>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Send to Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
