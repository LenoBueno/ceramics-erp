import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  ArrowUpDown,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  FileText,
  Printer,
  Download,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import Link from "next/link"

// Sample transaction data
const transactions = [
  {
    id: "TRX-2025-00001",
    date: "2025-03-19",
    description: "Order Payment - ORD-2025-003",
    customer: "Artesanato Brasil",
    type: "income",
    amount: 5630.25,
    category: "Sales",
    status: "completed",
  },
  {
    id: "TRX-2025-00002",
    date: "2025-03-18",
    description: "Raw Materials Purchase - Clay",
    supplier: "Materials Suppliers Ltd.",
    type: "expense",
    amount: 2845.0,
    category: "Materials",
    status: "completed",
  },
  {
    id: "TRX-2025-00003",
    date: "2025-03-17",
    description: "Order Payment - ORD-2025-002",
    customer: "Casa & Decoração",
    type: "income",
    amount: 3210.5,
    category: "Sales",
    status: "pending",
  },
  {
    id: "TRX-2025-00004",
    date: "2025-03-16",
    description: "Equipment Maintenance",
    supplier: "Kiln Services Inc.",
    type: "expense",
    amount: 850.75,
    category: "Maintenance",
    status: "completed",
  },
  {
    id: "TRX-2025-00005",
    date: "2025-03-15",
    description: "Utilities Payment - Electricity",
    supplier: "Energy Company",
    type: "expense",
    amount: 1320.3,
    category: "Utilities",
    status: "completed",
  },
  {
    id: "TRX-2025-00006",
    date: "2025-03-14",
    description: "Order Payment - ORD-2025-004",
    customer: "Cerâmicas Elite",
    type: "income",
    amount: 2950.75,
    category: "Sales",
    status: "completed",
  },
]

// Get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "failed":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
  }
}

// Get transaction type color
const getTypeColor = (type: string) => {
  switch (type) {
    case "income":
      return "text-green-500"
    case "expense":
      return "text-red-500"
    default:
      return "text-gray-500"
  }
}

export default function FinancePage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/finance/reports">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Link>
          </Button>
          <Button asChild>
            <Link href="/finance/new-transaction">
              <Plus className="mr-2 h-4 w-4" />
              New Transaction
            </Link>
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 54,230.65</div>
            <p className="text-xs text-muted-foreground">Updated today at 10:45 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 24,750.50</div>
            <p className="text-xs text-green-500">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 18,420.80</div>
            <p className="text-xs text-red-500">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 8,450.25</div>
            <p className="text-xs text-muted-foreground">4 pending transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>View and manage all financial transactions</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full sm:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="expense">Expense</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <DateRangePicker />
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="materials">Materials</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search transactions..." className="pl-8 w-full sm:w-[250px]" />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="all" className="m-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">
                      <div className="flex items-center space-x-1">
                        <span>Transaction ID</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        <Link href={`/finance/${transaction.id}`} className="hover:underline">
                          {transaction.id}
                        </Link>
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <span className={getTypeColor(transaction.type)}>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className={`text-right ${getTypeColor(transaction.type)}`}>
                        {transaction.type === "expense" ? "- " : "+ "}
                        R$ {transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)} variant="outline">
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="income" className="m-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .filter((transaction) => transaction.type === "income")
                    .map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          <Link href={`/finance/${transaction.id}`} className="hover:underline">
                            {transaction.id}
                          </Link>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell className="text-right text-green-500">
                          + R$ {transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transaction.status)} variant="outline">
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="expense" className="m-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .filter((transaction) => transaction.type === "expense")
                    .map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          <Link href={`/finance/${transaction.id}`} className="hover:underline">
                            {transaction.id}
                          </Link>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>{transaction.supplier}</TableCell>
                        <TableCell className="text-right text-red-500">- R$ {transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(transaction.status)} variant="outline">
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  )
}

