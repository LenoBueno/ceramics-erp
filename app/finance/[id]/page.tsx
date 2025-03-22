import { Link } from "react-router-dom"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, FileText, Printer, Download, Edit, Clock, User, Building, FileCheck, Tag } from "lucide-react"

// Mock data for transaction details
const getTransactionById = (id: string) => {
  const transactions = {
    "TRX-2025-00001": {
      id: "TRX-2025-00001",
      date: "2025-03-19",
      description: "Order Payment - ORD-2025-003",
      customer: "Artesanato Brasil",
      contactName: "Ana Ferreira",
      contactEmail: "ana@artesanatobrasil.com.br",
      contactPhone: "(21) 98765-4321",
      reference: "ORD-2025-003",
      type: "income",
      amount: 5630.25,
      category: "Sales",
      paymentMethod: "Bank Transfer",
      accountNumber: "9876-5",
      notes: "Payment received for ceramic vases and decorative plates order.",
      status: "completed",
      createdBy: "Maria Oliveira",
      createdAt: "2025-03-19 09:45:32",
      updatedAt: "2025-03-19 10:15:17",
    },
    "TRX-2025-00002": {
      id: "TRX-2025-00002",
      date: "2025-03-18",
      description: "Raw Materials Purchase - Clay",
      supplier: "Materials Suppliers Ltd.",
      contactName: "Roberto Mendes",
      contactEmail: "roberto@materialsuppliers.com.br",
      contactPhone: "(11) 97654-3210",
      reference: "PO-2025-018",
      type: "expense",
      amount: 2845.0,
      category: "Materials",
      paymentMethod: "Bank Transfer",
      accountNumber: "1234-5",
      notes: "Payment for 500kg of premium quality clay for ceramic production.",
      status: "completed",
      createdBy: "João Silva",
      createdAt: "2025-03-18 14:30:22",
      updatedAt: "2025-03-18 15:05:41",
    },
  }

  return transactions[id as keyof typeof transactions]
}

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

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const transaction = getTransactionById(params.id)

  if (!transaction) {
    return notFound()
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/finance">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Transaction: {transaction.id}</h1>
          <Badge className={getStatusColor(transaction.status)} variant="outline">
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </Badge>
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
          <Button size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Transaction Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>Complete information about transaction {transaction.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
                  <p className="font-medium">{transaction.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="font-medium">{transaction.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="font-medium">{transaction.description}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Reference</p>
                  <p className="font-medium">{transaction.reference}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className={`font-medium ${getTypeColor(transaction.type)}`}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className="font-medium">{transaction.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p className="font-medium">{transaction.paymentMethod}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                  <p className="font-medium">{transaction.accountNumber}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Notes</p>
                <p>{transaction.notes}</p>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Created by {transaction.createdBy} on {transaction.createdAt}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last updated on {transaction.updatedAt}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Side Cards */}
        <div className="space-y-6">
          {/* Amount Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getTypeColor(transaction.type)}`}>
                {transaction.type === "expense" ? "- " : "+ "}
                R$ {transaction.amount.toFixed(2)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {transaction.type === "income" ? "Received" : "Paid"} on {transaction.date}
              </p>
            </CardContent>
          </Card>

          {/* Contact Info Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>{transaction.type === "income" ? "Customer" : "Supplier"} Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">
                      {transaction.type === "income" ? transaction.customer : transaction.supplier}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.type === "income" ? "Customer" : "Supplier"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{transaction.contactName}</p>
                    <p className="text-sm text-muted-foreground">{transaction.contactEmail}</p>
                    <p className="text-sm text-muted-foreground">{transaction.contactPhone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Documents Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Related Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="#">
                    <FileText className="mr-2 h-4 w-4" />
                    Invoice #{transaction.reference}
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="#">
                    <FileCheck className="mr-2 h-4 w-4" />
                    Receipt #{transaction.id}
                  </Link>
                </Button>

                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href={`/orders/${transaction.reference}`}>
                    <Tag className="mr-2 h-4 w-4" />
                    Related Order
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

