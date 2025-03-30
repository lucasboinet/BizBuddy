'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Eye, FileText, Grid, ImageIcon, List, MoreHorizontal, Music, PlusCircle, Video } from "lucide-react";
import { useState } from "react";

interface Props {
  files: any[];
}

export default function ProjectTabFiles({ files }: Props) {
  const [viewMode, setViewMode] = useState("grid")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Project Files</CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              className="px-3 rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              className="px-3 rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload File
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map((file) => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {file.type === "pdf" && <FileText className="h-5 w-5 text-red-500" />}
                  {file.type === "docx" && <FileText className="h-5 w-5 text-blue-500" />}
                  {file.type === "sketch" && <ImageIcon className="h-5 w-5 text-amber-500" />}
                  {file.type === "jpg" && <ImageIcon className="h-5 w-5 text-green-500" />}
                  {file.type === "png" && <ImageIcon className="h-5 w-5 text-green-500" />}
                  {file.type === "mp4" && <Video className="h-5 w-5 text-purple-500" />}
                  {file.type === "mp3" && <Music className="h-5 w-5 text-pink-500" />}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Preview file</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download file</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Preview</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function FileCard({ file }: { file: any }) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />
      case "docx":
        return <FileText className="h-8 w-8 text-blue-500" />
      case "sketch":
        return <ImageIcon className="h-8 w-8 text-amber-500" />
      case "jpg":
      case "png":
        return <ImageIcon className="h-8 w-8 text-green-500" />
      case "mp4":
        return <Video className="h-8 w-8 text-purple-500" />
      case "mp3":
        return <Music className="h-8 w-8 text-pink-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="group relative bg-background border rounded-lg overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square flex items-center justify-center bg-muted/50 p-6">{getFileIcon(file.type)}</div>
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{file.name}</h3>
        <p className="text-xs text-muted-foreground">
          {file.size} • {file.date}
        </p>
      </div>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
        <Button size="icon" variant="secondary" className="h-8 w-8">
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}