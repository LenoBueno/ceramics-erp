import { Link } from "react-router-dom"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, Truck, PackageOpen, Printer, FileText, Clock, Check, AlertTriangle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// This would come from your database in a real app
const getOrderById = (id: string) => {
  const orders = {
    "ORD-2025-001": {
      id: "ORD-2025-001",
      customer: {
        name: "Galeria Cerâmica",
        email: "contato@galeriaceramica.com.br",
        phone: "(11) 3456-7890",
        address: "Av. Paulista, 1000, São Paulo - SP",
      },
      date: "2025-03-18",
      total: 4850.0,
      subtotal: 4500.0,
      tax: 350.0,
      status: "pending",
      paymentMethod: "Bank Transfer",
      paymentStatus: "pending",
      shippingMethod: "Standard Delivery",
      estimatedDelivery: "2025-03-25",
      items: [
        {
          id: "PROD-001",
          name: "Ceramic Vase - Floral Pattern",
          price: 125.0,
          quantity: 12,
          total: 1500.0,
        },
        {
          id: "PROD-008",
          name: "Decorative Ceramic Plate - Handpainted",
          price: 150.0,
          quantity: 20,
          total: 3000.0,
        },
      ],
      timeline: [
        {
          date: "2025-03-18 09:35",
          status: "Order Placed",
          description: "Order has been placed by customer",
        },
        {
          date: "2025-03-18 10:20",
          status: "Payment Pending",
          description: "Awaiting payment confirmation",
        },
      ],
    },
  }

  return orders[id as keyof typeof orders]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
    case "processing":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "shipped":
      return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
    case "delivered":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "canceled":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
  }
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = getOrderById(params.id)

  if (!order) {
    return notFound()
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link to="/orders">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Order {order.id}</h1>
          <Badge className={getStatusColor(order.status)} variant="outline">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Invoice
          </Button>
          <Button variant="default" size="sm">
            <Truck className="mr-2 h-4 w-4" />
            Update Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Complete information about order {order.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="items">
              <TabsList className="mb-4">
                <TabsTrigger value="items">
                  <PackageOpen className="mr-2 h-4 w-4" />
                  Items
                </TabsTrigger>
                <TabsTrigger value="timeline">
                  <Clock className="mr-2 h-4 w-4" />
                  Timeline
                </TabsTrigger>
              </TabsList>

              <TabsContent value="items">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">ID: {item.id}</div>
                          </TableCell>
                          <TableCell className="text-right">R$ {item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">R$ {item.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Subtotal
                        </TableCell>
                        <TableCell className="text-right">R$ {order.subtotal.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Tax
                        </TableCell>
                        <TableCell className="text-right">R$ {order.tax.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">R$ {order.total.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="timeline">
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-background">
                        {index === 0 ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium leading-none">{event.status}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                  <div className="text-sm text-muted-foreground">{order.customer.phone}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm font-medium">Shipping Address</div>
                  <div className="text-sm text-muted-foreground">{order.customer.address}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment & Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium">Payment Method</div>
                  <div className="text-sm text-right">{order.paymentMethod}</div>

                  <div className="text-sm font-medium">Payment Status</div>
                  <div className="text-sm text-right">
                    <Badge className={getStatusColor(order.paymentStatus)} variant="outline">
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-sm font-medium">Shipping Method</div>
                  <div className="text-sm text-right">{order.shippingMethod}</div>

                  <div className="text-sm font-medium">Estimated Delivery</div>
                  <div className="text-sm text-right">{order.estimatedDelivery}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue={order.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full mt-4">Update Status</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

