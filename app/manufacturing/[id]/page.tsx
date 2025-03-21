import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, FileText, ClipboardCheck, PackageCheck, UserCheck, AlertCircle } from "lucide-react"

// Mock data for a production order
const getProductionOrderById = (id: string) => {
  const orders = {
    "PO-2025-001": {
      id: "PO-2025-001",
      name: "Ceramic Vases - Medium Size",
      description: "Production of 200 medium-sized ceramic vases with floral pattern",
      startDate: "2025-03-16",
      endDate: "2025-03-22",
      status: "in-progress",
      progress: 67,
      assignedTo: "Team A",
      priority: "High",
      materials: [
        { id: "MAT-001", name: "Clay - Type A", required: "450kg", consumed: "302kg", remaining: "148kg" },
        { id: "MAT-008", name: "Glaze - Blue Pattern", required: "30L", consumed: "20L", remaining: "10L" },
        { id: "MAT-015", name: "Paint - Gold Trim", required: "5L", consumed: "3L", remaining: "2L" },
      ],
      stages: [
        { id: 1, name: "Clay Preparation", status: "completed", progress: 100 },
        { id: 2, name: "Forming & Shaping", status: "completed", progress: 100 },
        { id: 3, name: "Initial Drying", status: "completed", progress: 100 },
        { id: 4, name: "Bisque Firing", status: "in-progress", progress: 75 },
        { id: 5, name: "Glazing", status: "not-started", progress: 0 },
        { id: 6, name: "Glaze Firing", status: "not-started", progress: 0 },
        { id: 7, name: "Final Decoration", status: "not-started", progress: 0 },
        { id: 8, name: "Quality Control", status: "not-started", progress: 0 },
      ],
      team: [
        { id: "EMP001", name: "Maria Silva", role: "Production Manager", avatar: "MS" },
        { id: "EMP015", name: "João Santos", role: "Ceramics Specialist", avatar: "JS" },
        { id: "EMP023", name: "Ana Lima", role: "Quality Control", avatar: "AL" },
        { id: "EMP042", name: "Carlos Gomes", role: "Kiln Operator", avatar: "CG" },
      ],
      notes: [
        {
          date: "2025-03-16",
          author: "Maria Silva",
          content: "Production started as scheduled. All materials available.",
        },
        {
          date: "2025-03-18",
          author: "João Santos",
          content: "Slight variation in clay consistency. Adjusted water content to compensate.",
        },
        {
          date: "2025-03-19",
          author: "Carlos Gomes",
          content: "Bisque firing started. First batch of 50 pieces loaded into kiln #2.",
        },
      ],
      quality: {
        inspected: 100,
        passed: 98,
        rejected: 2,
        issues: [
          { type: "Minor Cracks", count: 1 },
          { type: "Color Variation", count: 1 },
        ],
      },
    },
  }

  return orders[id as keyof typeof orders]
}

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
    case "not-started":
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
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

export default function ProductionOrderDetailPage({ params }: { params: { id: string } }) {
  const order = getProductionOrderById(params.id)

  if (!order) {
    return notFound()
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/manufacturing">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Production Order: {order.id}</h1>
          <Badge className={getStatusColor(order.status)} variant="outline">
            {order.status === "in-progress"
              ? "In Progress"
              : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Report
          </Button>
          <Button variant="outline" size="sm">
            <ClipboardCheck className="mr-2 h-4 w-4" />
            Update Progress
          </Button>
          <Button size="sm">
            <PackageCheck className="mr-2 h-4 w-4" />
            Complete Order
          </Button>
        </div>
      </div>

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Order Overview</CardTitle>
          <CardDescription>{order.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Start Date</p>
              <p className="font-medium">{order.startDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">End Date</p>
              <p className="font-medium">{order.endDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Assigned Team</p>
              <p className="font-medium">{order.assignedTo}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Priority</p>
              <p className="font-medium">{order.priority}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{order.progress}%</p>
              </div>
              <Badge variant="outline">7 days remaining</Badge>
            </div>
            <Progress value={order.progress} className={`h-2 ${getProgressColor(order.status, order.progress)}`} />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Production Stages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.stages.map((stage) => (
                  <TableRow key={stage.id}>
                    <TableCell>{stage.name}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(stage.status)} variant="outline">
                        {stage.status === "in-progress"
                          ? "In Progress"
                          : stage.status === "not-started"
                            ? "Not Started"
                            : stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={stage.progress}
                          className={`h-2 w-24 ${getProgressColor(stage.status, stage.progress)}`}
                        />
                        <span className="text-sm">{stage.progress}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Materials */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.materials.map((material) => (
                  <div key={material.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">{material.name}</p>
                      <Badge variant="outline">{material.id}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Required</p>
                        <p>{material.required}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Used</p>
                        <p>{material.consumed}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Remaining</p>
                        <p>{material.remaining}</p>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.team.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality Control */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quality Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Inspected</p>
                  <p className="text-xl font-bold">{order.quality.inspected}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Passed</p>
                  <p className="text-xl font-bold text-green-500">{order.quality.passed}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-xl font-bold text-red-500">{order.quality.rejected}</p>
                </div>
              </div>

              {order.quality.issues.length > 0 && (
                <>
                  <p className="text-sm font-medium mb-2">Issues Detected:</p>
                  <div className="space-y-2">
                    {order.quality.issues.map((issue, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                          <span className="text-sm">{issue.type}</span>
                        </div>
                        <Badge variant="outline">{issue.count}</Badge>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Production Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Production Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.notes.map((note, index) => (
              <div key={index} className="flex gap-4 p-3 rounded-lg border">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{note.author}</p>
                    <p className="text-xs text-muted-foreground">{note.date}</p>
                  </div>
                  <p className="mt-1 text-sm">{note.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

