import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Filter, Layers, TrendingUp, Calendar, AlertCircle, BarChart3 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"

// Mock data for production orders
const productionOrders = [
  {
    id: "PO-2025-001",
    name: "Ceramic Vases - Medium Size",
    startDate: "2025-03-16",
    endDate: "2025-03-22",
    status: "in-progress",
    progress: 67,
    assignedTo: "Team A",
  },
  {
    id: "PO-2025-002",
    name: "Decorative Plates - Floral Design",
    startDate: "2025-03-17",
    endDate: "2025-03-24",
    status: "planned",
    progress: 0,
    assignedTo: "Team B",
  },
  {
    id: "PO-2025-003",
    name: "Custom Mugs - Corporate Order",
    startDate: "2025-03-14",
    endDate: "2025-03-18",
    status: "completed",
    progress: 100,
    assignedTo: "Team A",
  },
  {
    id: "PO-2025-004",
    name: "Ceramic Tiles - Bathroom Set",
    startDate: "2025-03-15",
    endDate: "2025-03-21",
    status: "delayed",
    progress: 35,
    assignedTo: "Team C",
  },
  {
    id: "PO-2025-005",
    name: "Garden Pottery - Planters",
    startDate: "2025-03-19",
    endDate: "2025-03-26",
    status: "planned",
    progress: 0,
    assignedTo: "Team B",
  },
]

// Get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "in-progress":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
    case "planned":
      return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
    case "completed":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
    case "delayed":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
  }
}

// Get progress bar color
const getProgressColor = (status: string, progress: number) => {
  if (status === "delayed") return "bg-red-500"
  if (progress === 100) return "bg-green-500"
  return "bg-blue-500"
}

export default function ManufacturingPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Manufacturing</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/manufacturing/schedule">
              <Calendar className="mr-2 h-4 w-4" />
              Production Schedule
            </Link>
          </Button>
          <Button asChild>
            <Link to="/manufacturing/new-order">
              <Plus className="mr-2 h-4 w-4" />
              New Production Order
            </Link>
          </Button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">+2 orders since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-green-500">+2.5% from target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.3%</div>
            <p className="text-xs text-red-500">-3.7% from target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delayed Orders</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">6.5% of total orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Production Orders */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Production Orders</CardTitle>
              <CardDescription>Manage all manufacturing production orders</CardDescription>
            </div>
            <div className="flex w-full sm:w-auto gap-2">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search orders..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="planned">Planned</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="delayed">Delayed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Order ID</TableHead>
                      <TableHead>Production Order</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productionOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <Link to={`/manufacturing/${order.id}`} className="hover:underline">
                            {order.name}
                          </Link>
                        </TableCell>
                        <TableCell>{order.assignedTo}</TableCell>
                        <TableCell>{order.startDate}</TableCell>
                        <TableCell>{order.endDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={order.progress}
                              className={`h-2 ${getProgressColor(order.status, order.progress)}`}
                            />
                            <span className="text-sm">{order.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)} variant="outline">
                            {order.status === "in-progress"
                              ? "In Progress"
                              : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Other tabs would have similar content but filtered */}
            <TabsContent value="in-progress" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Order ID</TableHead>
                      <TableHead>Production Order</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productionOrders
                      .filter((order) => order.status === "in-progress")
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <Link href={`/manufacturing/${order.id}`} className="hover:underline">
                              {order.name}
                            </Link>
                          </TableCell>
                          <TableCell>{order.assignedTo}</TableCell>
                          <TableCell>{order.startDate}</TableCell>
                          <TableCell>{order.endDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={order.progress}
                                className={`h-2 ${getProgressColor(order.status, order.progress)}`}
                              />
                              <span className="text-sm">{order.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)} variant="outline">
                              In Progress
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Other tabs would follow the same pattern */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

