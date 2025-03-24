import { CreateInvoiceModal } from "@/app/(dashboard)/invoices/_components/create-invoice-modal";
import { CreateProjectModal } from "@/app/(dashboard)/projects/_components/create-project-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppCustomer, YearlyRevenue } from "@/types/customers";
import { INVOICE_STATUS } from "@/types/invoices";
import { format } from "date-fns";
import { Edit, FileText, Mail, MapPin, Phone, Plus } from "lucide-react";

interface Props {
  customer: AppCustomer;
  revenue: YearlyRevenue;
  totalRevenue: number;
  pendingRevenue: number;
  activeProjects: number;
  completedProjects: number;
}

export default function OverviewTab({ customer, revenue, totalRevenue, pendingRevenue, activeProjects, completedProjects }: Props) {
  const totalProjects = customer.projects.length;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card className="shadow-none">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt={customer.name} />
                  <AvatarFallback className="bg-primary text-secondary text-xl">
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{customer.name}</h2>
                    {/* <Badge className={statusStyles[customer.status as keyof typeof statusStyles]}>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </Badge> */}
                  </div>
                  <p className="text-muted-foreground">
                    Customer since {format(customer.createdAt, "MMMM d, yyyy")}
                  </p>
                  {/* <div className="flex gap-1 mt-1">
                          {customer.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div> */}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                {/* <Button className="bg-green-300 hover:bg-green-400 text-green-900" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button> */}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <a
                      href={`mailto:${customer.email}`}
                      className="text-sm text-muted-foreground hover:text-green-600"
                    >
                      {customer.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <a
                      href={`tel:${customer.phone}`}
                      className="text-sm text-muted-foreground hover:text-green-600"
                    >
                      {customer.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">{customer.address.line1}{customer.address.line2 && " " + customer.address.line2}, {customer.address.city} {customer.address.postalCode}</div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-sm font-medium mb-2">Notes</h3>
              {/* <div className="text-sm text-muted-foreground p-3 bg-muted/20 rounded-md">{customer.notes}</div> */}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Revenue History</CardTitle>
            <CardDescription>Monthly revenue from this customer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full bg-secondary/70 rounded-md px-2">
                    <div className="flex h-full">
                      {revenue.map((month, index) => (
                        <div key={index} className="flex-1 flex flex-col justify-end p-2">
                          <div
                            className="bg-primary rounded-t-sm w-full"
                            style={{
                              height: `${(month.revenue / Math.max(...revenue.map((d) => d.revenue))) * 80}%`,
                              minHeight: month.revenue > 0 ? "10px" : "0",
                            }}
                          ></div>
                          <div className="text-xs text-center mt-1">{month.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Customer Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Total Revenue</div>
                <div className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</div>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Pending</div>
                <div className="text-2xl font-bold text-primary">${pendingRevenue.toLocaleString()}</div>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Projects</div>
                <div className="text-2xl font-bold text-primary">{totalProjects}</div>
                <div className="text-xs text-muted-foreground">
                  {activeProjects} active, {completedProjects} completed
                </div>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Invoices</div>
                <div className="text-2xl font-bold text-primary">{customer.invoices.length}</div>
                <div className="text-xs text-muted-foreground">
                  {customer.invoices.filter((i) => i.status === INVOICE_STATUS.PAID).length} paid
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-2">
                <CreateProjectModal selectedCustomer={customer}>
                  <Button className="w-full">
                    <Plus className="h-4 w-4" />
                    New Project
                  </Button>
                </CreateProjectModal>
                <CreateInvoiceModal selectedCustomer={customer}>
                  <Button className="w-full">
                    <FileText className="h-4 w-4" />
                    Create Invoice
                  </Button>
                </CreateInvoiceModal>
                {/* <Button variant="outline" className="border-green-200 w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </Button> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}