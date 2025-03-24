// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { AppCustomer } from "@/types/customers"
// import { format } from "date-fns"
// import { Download, Edit, FileIcon, Upload } from "lucide-react"
// import Link from "next/link"

// interface Props {
//   customer: AppCustomer
// }

// const files = [
//   {
//     id: "1",
//     name: "wireframes.pdf",
//     type: "pdf",
//     size: "2.4 MB",
//     project: "cm8bl7ila0001kk7wylriulo8",
//     uploadedBy: "You",
//     uploadedAt: new Date("2024-01-20"),
//   },
//   {
//     id: "2",
//     name: "homepage-design-v2.fig",
//     type: "figma",
//     size: "8.7 MB",
//     project: "cm8bl7ila0001kk7wylriulo8",
//     uploadedBy: "Alex Chen",
//     uploadedAt: new Date("2024-01-25"),
//   },
//   {
//     id: "3",
//     name: "product-photos.zip",
//     type: "zip",
//     size: "15.2 MB",
//     project: "cm8emy5w20003kk2w54ocljsk",
//     uploadedBy: "You",
//     uploadedAt: new Date("2024-02-15"),
//   },
//   {
//     id: "4",
//     name: "seo-report.pdf",
//     type: "pdf",
//     size: "1.8 MB",
//     project: "cm8ccdtfb0000kkz8tiomv463",
//     uploadedBy: "You",
//     uploadedAt: new Date("2023-12-10"),
//   },
//   {
//     id: "5",
//     name: "keyword-analysis.xlsx",
//     type: "excel",
//     size: "0.9 MB",
//     project: "cm8ccdtfb0000kkz8tiomv463",
//     uploadedBy: "Sarah Johnson",
//     uploadedAt: new Date("2023-11-20"),
//   },
// ]

export default function FilesTab() {
  return (
    <>
      {/* <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Files</h2>
          <p className="text-sm text-muted-foreground">
            {files.length} files across {customer.projects.length} projects
          </p>
        </div>
        <Button className="bg-green-300 hover:bg-green-400 text-green-900">
          <Upload className="mr-2 h-4 w-4" />
          Upload File
        </Button>
      </div>

      {customer.projects.map((project) => {
        const projectFiles = files.filter((file) => file.project === project.id)
        if (projectFiles.length === 0) return null

        return (
          <Card key={project.id} className="border-green-100 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                <Link href={`/dashboard/projects/${project.id}`} className="hover:text-green-600 transition-colors">
                  {project.name}
                </Link>
              </CardTitle>
              <CardDescription>{projectFiles.length} files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex flex-col rounded-lg border border-green-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="bg-green-50 p-6 flex items-center justify-center">
                      <FileIcon type={file.type} />
                    </div>
                    <div className="p-4">
                      <div className="font-medium truncate">{file.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {file.size} • Uploaded on {format(file.uploadedAt, "MMMM d, yyyy")}
                      </div>
                      <div className="text-xs text-muted-foreground">By: {file.uploadedBy}</div>
                      <div className="flex justify-between items-center mt-3">
                        <Button variant="outline" size="sm" className="text-xs h-8 border-green-200">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })} */}
    </>
  )
}