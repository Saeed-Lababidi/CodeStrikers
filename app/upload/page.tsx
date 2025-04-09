"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Video, FileVideo, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const simulateUpload = () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          toast({
            title: "Upload Complete",
            description: "Your video has been uploaded and is now being processed for analysis.",
          })
          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  return (
    <Container className="py-6 sm:py-10">
      <PageHeader title="Upload Footage" />

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload">Upload Video</TabsTrigger>
          <TabsTrigger value="record">Record Video</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Match or Training Footage</CardTitle>
                <CardDescription>Upload video files for AI analysis. Supported formats: MP4, MOV, AVI.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => document.getElementById("video-upload")?.click()}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="text-sm font-medium">{file ? file.name : "Drag and drop or click to upload"}</p>
                      <p className="text-xs text-gray-500">Max file size: 500MB</p>
                    </div>
                    <Input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  {file && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <FileVideo className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                      </div>

                      {uploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Uploading...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="video-title">Video Title</Label>
                        <Input id="video-title" placeholder="Enter a title for this video" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="video-description">Description (Optional)</Label>
                        <Input id="video-description" placeholder="Add details about this footage" />
                      </div>

                      <Button className="w-full" onClick={simulateUpload} disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload and Analyze"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Options</CardTitle>
                  <CardDescription>Select what you want our AI to analyze in your footage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="player-tracking" className="rounded" defaultChecked />
                      <Label htmlFor="player-tracking">Player Tracking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="technical-skills" className="rounded" defaultChecked />
                      <Label htmlFor="technical-skills">Technical Skills Analysis</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="physical-metrics" className="rounded" defaultChecked />
                      <Label htmlFor="physical-metrics">Physical Metrics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="tactical-analysis" className="rounded" defaultChecked />
                      <Label htmlFor="tactical-analysis">Tactical Analysis</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="generate-report" className="rounded" defaultChecked />
                      <Label htmlFor="generate-report">Generate Scouting Report</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Processing Time</AlertTitle>
                <AlertDescription>
                  Analysis typically takes 15-30 minutes depending on video length and selected options.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="record">
          <Card>
            <CardHeader>
              <CardTitle>Record Live Footage</CardTitle>
              <CardDescription>Use your camera to record and analyze footage in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-16 w-16 text-gray-400" />
                <p className="text-gray-500 mt-2">Camera access required</p>
              </div>
              <Button className="w-full" variant="outline">
                Start Recording
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  )
}
