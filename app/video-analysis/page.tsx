"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Video, Upload, FileVideo, AlertCircle, Code } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { PageHeader } from "@/components/layout/page-header"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function VideoAnalysisPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [pythonScript, setPythonScript] = useState(`
import cv2
import numpy as np

def analyze_video(video_path):
    # Open the video file
    cap = cv2.VideoCapture(video_path)
    
    # Check if video opened successfully
    if not cap.isOpened():
        print("Error: Could not open video.")
        return
    
    # Get video properties
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    print(f"Video Properties:")
    print(f"- Resolution: {width}x{height}")
    print(f"- FPS: {fps}")
    print(f"- Total Frames: {frame_count}")
    print(f"- Duration: {frame_count/fps:.2f} seconds")
    
    # Initialize variables for motion detection
    total_motion = 0
    frame_count_processed = 0
    
    # Process video frames
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Convert frame to grayscale for processing
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Simple processing - detect edges
        edges = cv2.Canny(gray, 100, 200)
        
        # Count non-zero pixels as a simple motion metric
        motion = np.count_nonzero(edges) / (width * height)
        total_motion += motion
        
        frame_count_processed += 1
        
        # Print progress every 100 frames
        if frame_count_processed % 100 == 0:
            print(f"Processed {frame_count_processed}/{frame_count} frames ({frame_count_processed/frame_count*100:.1f}%)")
    
    # Calculate average motion
    avg_motion = total_motion / frame_count_processed if frame_count_processed > 0 else 0
    
    print("\\nAnalysis Results:")
    print(f"- Frames Processed: {frame_count_processed}")
    print(f"- Average Motion: {avg_motion:.6f}")
    
    # Classify based on motion (very simple example)
    if avg_motion > 0.05:
        print("- High movement detected")
    elif avg_motion > 0.02:
        print("- Moderate movement detected")
    else:
        print("- Low movement detected")
    
    # Release video capture
    cap.release()
    
    return {
        "resolution": f"{width}x{height}",
        "fps": fps,
        "frames": frame_count,
        "duration": f"{frame_count/fps:.2f} seconds",
        "avg_motion": avg_motion
    }

# This function would be called with the path to the uploaded video
# analyze_video("path/to/video.mp4")
`)
  const [scriptOutput, setScriptOutput] = useState("")
  const [isRunningScript, setIsRunningScript] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Check if it's a video file
      if (!selectedFile.type.startsWith("video/")) {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      setUploaded(false)
      setVideoUrl(null)
      setScriptOutput("")
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
          setUploaded(true)

          // Create a temporary URL for the video
          const url = URL.createObjectURL(file)
          setVideoUrl(url)

          toast({
            title: "Upload Complete",
            description: "Your video has been uploaded and is ready for analysis.",
          })
          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  const runPythonScript = () => {
    if (!videoUrl) {
      toast({
        title: "No video uploaded",
        description: "Please upload a video first",
        variant: "destructive",
      })
      return
    }

    setIsRunningScript(true)
    setScriptOutput("")

    // Simulate running the Python script
    setTimeout(() => {
      // Generate mock output
      const mockOutput = `
Video Properties:
- Resolution: 1280x720
- FPS: 30.0
- Total Frames: 1800
- Duration: 60.00 seconds

Processed 100/1800 frames (5.6%)
Processed 200/1800 frames (11.1%)
Processed 300/1800 frames (16.7%)
Processed 400/1800 frames (22.2%)
Processed 500/1800 frames (27.8%)
Processed 600/1800 frames (33.3%)
Processed 700/1800 frames (38.9%)
Processed 800/1800 frames (44.4%)
Processed 900/1800 frames (50.0%)
Processed 1000/1800 frames (55.6%)
Processed 1100/1800 frames (61.1%)
Processed 1200/1800 frames (66.7%)
Processed 1300/1800 frames (72.2%)
Processed 1400/1800 frames (77.8%)
Processed 1500/1800 frames (83.3%)
Processed 1600/1800 frames (88.9%)
Processed 1700/1800 frames (94.4%)
Processed 1800/1800 frames (100.0%)

Analysis Results:
- Frames Processed: 1800
- Average Motion: 0.038452
- Moderate movement detected

Player Detection:
- Detected 11 players in the video
- Average player movement speed: 4.2 m/s
- Identified player positions: 4 defenders, 4 midfielders, 2 forwards, 1 goalkeeper
      `

      setScriptOutput(mockOutput)
      setIsRunningScript(false)

      toast({
        title: "Analysis Complete",
        description: "The Python script has finished analyzing the video.",
      })
    }, 5000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-green-600" />
            <span>ScoutVision AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="font-medium">
              Dashboard
            </Link>
            <Link href="/upload" className="font-medium">
              Upload
            </Link>
            <Link href="/video-analysis" className="font-medium text-green-600">
              Video Analysis
            </Link>
            <Link href="/players" className="font-medium">
              Players
            </Link>
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-6 sm:py-10">
          <PageHeader title="Video Analysis with Python" description="Upload a video and run Python analysis scripts" />

          <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Video</CardTitle>
                <CardDescription>Upload a video file for Python script analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Upload className="h-10 w-10 text-gray-400" />
                      <p className="text-sm font-medium">{file ? file.name : "Drag and drop or click to upload"}</p>
                      <p className="text-xs text-gray-500">Max file size: 500MB</p>
                    </div>
                    <input
                      ref={fileInputRef}
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

                      <Button className="w-full" onClick={simulateUpload} disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload Video"}
                      </Button>
                    </div>
                  )}

                  {videoUrl && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Video Preview:</h3>
                      <video
                        src={videoUrl}
                        controls
                        className="w-full rounded-md border"
                        style={{ maxHeight: "300px" }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Python Script</CardTitle>
                <CardDescription>Edit and run Python script on the uploaded video</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="python-script">Python Code:</Label>
                    <Textarea
                      id="python-script"
                      value={pythonScript}
                      onChange={(e) => setPythonScript(e.target.value)}
                      className="font-mono text-sm h-[300px]"
                    />
                  </div>

                  <Button className="w-full gap-2" onClick={runPythonScript} disabled={!videoUrl || isRunningScript}>
                    <Code className="h-4 w-4" />
                    {isRunningScript ? "Running Script..." : "Run Python Script"}
                  </Button>

                  {scriptOutput && (
                    <div className="space-y-2">
                      <Label>Script Output:</Label>
                      <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm whitespace-pre-wrap overflow-auto max-h-[300px]">
                        {scriptOutput}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription>
              This is a simulation of running a Python script on an uploaded video. In a real implementation, the script
              would be executed on the server using a Python runtime environment.
            </AlertDescription>
          </Alert>
        </Container>
      </main>

      <footer className="border-t py-6 mt-auto">
        <Container className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 ScoutVision AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-gray-500 hover:underline">
              About
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:underline">
              Privacy
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  )
}
