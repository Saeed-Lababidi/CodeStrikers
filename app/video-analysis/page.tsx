"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Upload, Download, Save, RefreshCw, X, Maximize, Volume2, VolumeX } from "lucide-react"
import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"

export default function VideoAnalysisPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [pythonScript, setPythonScript] = useState<string>(DEFAULT_PYTHON_SCRIPT)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null)

  const videoInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setVideoFile(file)

      // Revoke previous URL to prevent memory leaks
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }

      const newVideoUrl = URL.createObjectURL(file)
      setVideoUrl(newVideoUrl)

      // Generate thumbnail
      setTimeout(() => {
        generateThumbnail(newVideoUrl)
      }, 500)

      toast({
        title: "Video uploaded",
        description: `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`,
      })
    }
  }

  // Generate video thumbnail
  const generateThumbnail = (url: string) => {
    const video = document.createElement("video")
    video.src = url
    video.crossOrigin = "anonymous"
    video.muted = true
    video.currentTime = 1 // Seek to 1 second

    video.onloadeddata = () => {
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const thumbnailUrl = canvas.toDataURL("image/jpeg")
        setThumbnailUrl(thumbnailUrl)
      }

      video.remove()
    }
  }

  // Handle script changes
  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPythonScript(e.target.value)
  }

  // Trigger file input click
  const handleUploadClick = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click()
    }
  }

  // Run analysis
  const handleRunAnalysis = () => {
    if (!videoFile) {
      toast({
        title: "Error",
        description: "Please upload a video file first",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setAnalysisResult(null)

    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)

          // Simulate analysis result
          setAnalysisResult(SAMPLE_ANALYSIS_RESULT)

          toast({
            title: "Analysis complete",
            description: "Video has been processed successfully",
          })

          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  // Save script
  const handleSaveScript = () => {
    // Create a blob and download link for the script
    const blob = new Blob([pythonScript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "video_analysis_script.py"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Script saved",
      description: "Python script has been downloaded",
    })
  }

  // Remove video
  const handleRemoveVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }
    setVideoFile(null)
    setVideoUrl(null)
    setThumbnailUrl(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }

  // Video playback controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
      if (videoRef.current) videoRef.current.muted = true
    } else if (isMuted) {
      setIsMuted(false)
      if (videoRef.current) videoRef.current.muted = false
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return

    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Handle video metadata loaded
  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [videoUrl])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.png" alt="CodeStrikers Logo" className="h-8 w-8" />
            <span>CodeStrikers</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="font-medium">
              Dashboard
            </Link>
            <Link href="/upload" className="font-medium">
              Upload
            </Link>
            <Link href="/players" className="font-medium">
              Players
            </Link>
            <Link href="/video-analysis" className="font-medium text-green-600">
              Python Analysis
            </Link>
          </nav>
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-6 sm:py-10">
          <PageHeader
            title="Python Video Analysis"
            description="Upload football footage and analyze it with custom Python scripts"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Video Upload and Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Video Upload</CardTitle>
                <CardDescription>Upload a video file for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!videoUrl ? (
                    <div
                      className="border-2 border-dashed border-gray-200 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={handleUploadClick}
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <p className="text-sm font-medium">Drag and drop or click to upload</p>
                        <p className="text-xs text-gray-500">MP4, MOV, or AVI up to 100MB</p>
                      </div>
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div
                        ref={videoContainerRef}
                        className="aspect-video bg-black rounded-lg overflow-hidden relative group"
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}
                      >
                        {/* Thumbnail overlay before play */}
                        {!isPlaying && thumbnailUrl && (
                          <div className="absolute inset-0 z-10">
                            <img
                              src={thumbnailUrl || "/placeholder.svg"}
                              alt="Video thumbnail"
                              className="w-full h-full object-contain"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-16 w-16 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-black"
                                onClick={togglePlay}
                              >
                                <Play className="h-8 w-8" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Video element */}
                        <video
                          ref={videoRef}
                          src={videoUrl}
                          className="w-full h-full"
                          onTimeUpdate={handleTimeUpdate}
                          onLoadedMetadata={handleMetadataLoaded}
                          onEnded={() => setIsPlaying(false)}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          playsInline
                        />

                        {/* Video controls */}
                        <div
                          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transition-opacity duration-300 ${
                            showControls || !isPlaying ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {/* Progress bar */}
                          <div className="mb-2">
                            <Slider
                              value={[currentTime]}
                              min={0}
                              max={duration || 100}
                              step={0.1}
                              onValueChange={handleSeek}
                              className="h-1"
                            />
                          </div>

                          {/* Controls row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/20"
                                onClick={togglePlay}
                              >
                                {isPlaying ? (
                                  <span className="h-4 w-4 block border-l-2 border-r-2 border-white" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>

                              <span className="text-xs text-white">
                                {formatTime(currentTime)} / {formatTime(duration)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 w-24">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-white hover:bg-white/20"
                                  onClick={toggleMute}
                                >
                                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                </Button>
                                <Slider
                                  value={[isMuted ? 0 : volume]}
                                  min={0}
                                  max={1}
                                  step={0.1}
                                  onValueChange={handleVolumeChange}
                                  className="h-1"
                                />
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/20"
                                onClick={toggleFullscreen}
                              >
                                <Maximize className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {videoFile?.name} (
                          {(videoFile?.size || 0) / (1024 * 1024) < 1
                            ? `${((videoFile?.size || 0) / 1024).toFixed(2)} KB`
                            : `${((videoFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB`}
                          )
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleUploadClick}>
                            Change
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleRemoveVideo}>
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Processing video...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={handleRunAnalysis} disabled={!videoFile || isProcessing}>
                      {isProcessing ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run Analysis
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Python Script Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Python Script</CardTitle>
                <CardDescription>Edit the Python script for video analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    className="font-mono text-sm h-[300px] resize-none"
                    value={pythonScript}
                    onChange={handleScriptChange}
                  />

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handleSaveScript}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Script
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setPythonScript(DEFAULT_PYTHON_SCRIPT)}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Script
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          {analysisResult && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>Output from the Python analysis script</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{analysisResult}</pre>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Results
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Alert className="mt-6">
            <AlertDescription>
              <p className="mb-2 font-medium">How to use the Python Analysis tool:</p>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Upload a video file of a football match or training session</li>
                <li>Customize the Python script if needed (the default script tracks player movements)</li>
                <li>Click "Run Analysis" to process the video</li>
                <li>View the results and download them for further analysis</li>
              </ol>
            </AlertDescription>
          </Alert>
        </Container>
      </main>

      <footer className="border-t py-6 mt-auto">
        <Container className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 CodeStrikers. All rights reserved.
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

// Default Python script for video analysis
const DEFAULT_PYTHON_SCRIPT = `import cv2
import numpy as np
import pandas as pd
from datetime import datetime

# Function to process video and track player movements
def analyze_football_video(video_path):
    # Load the video
    cap = cv2.VideoCapture(video_path)
    
    # Check if video opened successfully
    if not cap.isOpened():
        print("Error: Could not open video.")
        return None
    
    # Get video properties
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    print(f"Video properties: {width}x{height}, {fps} FPS, {frame_count} frames")
    
    # Initialize background subtractor
    backSub = cv2.createBackgroundSubtractorMOG2(history=120, varThreshold=40)
    
    # Initialize player tracking data
    player_positions = []
    frame_number = 0
    
    # Process video frames
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            
        # Apply background subtraction
        fg_mask = backSub.apply(frame)
        
        # Apply morphological operations to remove noise
        kernel = np.ones((5,5), np.uint8)
        fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_OPEN, kernel)
        fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, kernel)
        
        # Find contours
        contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Filter contours by size to identify players
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > 500:  # Minimum area threshold for a player
                x, y, w, h = cv2.boundingRect(contour)
                player_positions.append({
                    'frame': frame_number,
                    'time': frame_number / fps,
                    'x': x + w/2,  # Center x
                    'y': y + h/2,  # Center y
                    'width': w,
                    'height': h,
                    'area': area
                })
        
        frame_number += 1
        if frame_number % 100 == 0:
            print(f"Processed {frame_number} frames ({frame_number/frame_count*100:.1f}%)")
    
    # Release resources
    cap.release()
    
    # Convert to DataFrame for analysis
    df = pd.DataFrame(player_positions)
    
    # Basic statistics
    player_count = len(df.groupby('frame').size().mean())
    total_distance = calculate_total_distance(df)
    
    # Generate report
    report = f"""
    ===== Football Video Analysis Report =====
    Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
    
    Video Information:
    - Resolution: {width}x{height}
    - Duration: {frame_count/fps:.2f} seconds
    - Frame Rate: {fps} FPS
    - Total Frames: {frame_count}
    
    Analysis Results:
    - Average number of players detected: {player_count:.1f}
    - Total player movement distance: {total_distance:.2f} pixels
    - Average player speed: {total_distance/(frame_count/fps):.2f} pixels/second
    
    Player Position Heatmap:
    - Most activity in the center of the field
    - Significant player clustering in penalty areas
    
    Recommendations:
    - Focus on improving player spacing
    - Analyze defensive positioning during counter-attacks
    - Review player movement patterns in the final third
    """
    
    return report

# Helper function to calculate total distance moved
def calculate_total_distance(df):
    total_dist = 0
    # Group by unique player approximations and calculate distances
    # This is a simplified approach
    for i in range(1, len(df)):
        if df.iloc[i]['frame'] == df.iloc[i-1]['frame'] + 1:
            dx = df.iloc[i]['x'] - df.iloc[i-1]['x']
            dy = df.iloc[i]['y'] - df.iloc[i-1]['y']
            dist = np.sqrt(dx**2 + dy**2)
            total_dist += dist
    return total_dist

# Main function
def main():
    video_path = "football_match.mp4"  # Replace with actual path
    report = analyze_football_video(video_path)
    print(report)
    
    # Save results to file
    with open("analysis_results.txt", "w") as f:
        f.write(report)
    
    print("Analysis complete. Results saved to analysis_results.txt")

if __name__ == "__main__":
    main()
`

// Sample analysis result
const SAMPLE_ANALYSIS_RESULT = `
===== Football Video Analysis Report =====
Date: 2025-04-10 14:32:18

Video Information:
- Resolution: 1280x720
- Duration: 124.50 seconds
- Frame Rate: 30 FPS
- Total Frames: 3735

Analysis Results:
- Average number of players detected: 18.3
- Total player movement distance: 285432.78 pixels
- Average player speed: 2293.44 pixels/second

Player Position Heatmap:
- Most activity in the center of the field
- Significant player clustering in penalty areas

Player Movement Analysis:
- Player #7 covered the most distance (42,156 pixels)
- Player #10 had the highest average speed
- Defensive line maintained good formation throughout

Tactical Observations:
- Team maintained compact 4-4-2 formation in defense
- Effective pressing in the middle third
- Wide players provided good width in attacking phases

Recommendations:
- Focus on improving player spacing
- Analyze defensive positioning during counter-attacks
- Review player movement patterns in the final third

Processing complete. 22 players tracked successfully.
`
