"use client";

import { supabase } from "@/lib/supabase"; // Add this line
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Play,
  Upload,
  RefreshCw,
  X,
  Save,
  VolumeX,
  Volume2,
  Maximize,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";

// Remove or comment out the simulation code:
// const SAMPLE_ANALYSIS_RESULT = `...`

export default function VideoAnalysisPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [pythonScript, setPythonScript] = useState<string>(
    DEFAULT_PYTHON_SCRIPT
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null); // you can remove analysisResult if not needed
  const [outputVideoUrl, setOutputVideoUrl] = useState<string | null>(null); // new state for processed video URL
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const outputVideoRef = useRef<HTMLVideoElement>(null);
  const [outputIsPlaying, setOutputIsPlaying] = useState(false);
  const [outputCurrentTime, setOutputCurrentTime] = useState(0);
  const [outputDuration, setOutputDuration] = useState(0);
  const [outputIsMuted, setOutputIsMuted] = useState(false);
  const [outputVolume, setOutputVolume] = useState(1);
  const [outputShowControls, setOutputShowControls] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);

      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
      const newVideoUrl = URL.createObjectURL(file);
      setVideoUrl(newVideoUrl);

      // Generate thumbnail after upload for preview
      setTimeout(() => {
        generateThumbnail(newVideoUrl);
      }, 500);

      toast({
        title: "Video uploaded",
        description: `${file.name} (${(file.size / (1024 * 1024)).toFixed(
          2
        )} MB)`,
      });
    }
  };

  // Generate video thumbnail
  const generateThumbnail = (url: string) => {
    const video = document.createElement("video");
    video.src = url;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.currentTime = 1;
    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbUrl = canvas.toDataURL("image/jpeg");
        setThumbnailUrl(thumbUrl);
      }
      video.remove();
    };
  };

  // Trigger file input
  const handleUploadClick = () => {
    videoInputRef.current?.click();
  };

  const toggleOutputPlay = () => {
    if (outputVideoRef.current) {
      if (outputIsPlaying) {
        outputVideoRef.current.pause();
      } else {
        outputVideoRef.current.play();
      }
      setOutputIsPlaying(!outputIsPlaying);
    }
  };

  const toggleOutputMute = () => {
    if (outputVideoRef.current) {
      outputVideoRef.current.muted = !outputIsMuted;
      setOutputIsMuted(!outputIsMuted);
    }
  };

  const handleOutputSeek = (value: number[]) => {
    const newTime = value[0];
    setOutputCurrentTime(newTime);
    if (outputVideoRef.current) {
      outputVideoRef.current.currentTime = newTime;
    }
  };

  const handleOutputTimeUpdate = () => {
    if (outputVideoRef.current) {
      setOutputCurrentTime(outputVideoRef.current.currentTime);
    }
  };

  const handleOutputVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setOutputVolume(newVolume);
    if (outputVideoRef.current) {
      outputVideoRef.current.volume = newVolume;
      outputVideoRef.current.muted = newVolume === 0;
      setOutputIsMuted(newVolume === 0);
    }
  };

  const handleOutputMetadataLoaded = () => {
    if (outputVideoRef.current) {
      setOutputDuration(outputVideoRef.current.duration);
    }
  };

  async function uploadVideoToServer(file: File): Promise<{ fileName: string } | null> {
    setProgress(20);
    setIsProcessing(true);
  
    const { data, error } = await supabase.storage
      .from("videos")
      .upload(`raw/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
  
    if (error) {
      toast({
        title: "Upload Error",
        description: error.message || "Upload failed",
        variant: "destructive",
      });
      setIsProcessing(false);
      return null;
    }
  
    const originalUrl = supabase.storage.from("videos").getPublicUrl(data.path).data.publicUrl;
    const user = await supabase.auth.getUser();
  
    const insertResult = await supabase.from("videos").insert([
      {
        user_id: user.data.user?.id,
        original_url: originalUrl,
        processed_url: null,
      },
    ]).select().single();
  
    setVideoUrl(originalUrl);
    toast({ title: "Upload successful!", description: "Running AI analysis..." });
    setProgress(60);
    return { fileName: insertResult.data.id }; // we use row ID here
  }
  

  // Function: Run the Python model (calls the API endpoint /api/run-model)
  // Now, once the API returns the videoURL, fetch it as a Blob and create an object URL.
  async function runModel(videoId: string) {
    try {
      // Simulate processing and store "processed" version (replace with real logic)
      const simulatedPath = `processed/${videoFile!.name}`;
      await supabase.storage.from("videos").upload(simulatedPath, videoFile!, {
        upsert: true,
      });
  
      const processedUrl = supabase.storage.from("videos").getPublicUrl(simulatedPath).data.publicUrl;
  
      await supabase.from("videos").update({ processed_url: processedUrl }).eq("id", videoId);
      setOutputVideoUrl(processedUrl);
      setProgress(100);
      toast({ title: "Processing complete", description: "Processed video is ready!" });
    } catch (error: any) {
      toast({
        title: "Processing Error",
        description: error.message || "Processing failed",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }
  

  // Combined function: When the user clicks the "Run Analysis" button,
  // first upload the video, then call the runModel endpoint.
  const handleRunAnalysis = async () => {
    if (!videoFile) {
      toast({
        title: "Error",
        description: "Please upload a video file first",
        variant: "destructive",
      });
      return;
    }
  
    const uploadResult = await uploadVideoToServer(videoFile);
    if (uploadResult) {
      await runModel(uploadResult.fileName);
    }
  };
  

  // Remove video
  const handleRemoveVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoFile(null);
    setVideoUrl(null);
    setThumbnailUrl(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setOutputVideoUrl(null);
  };

  // (Playback controls unchanged…)
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
      if (videoRef.current) videoRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      if (videoRef.current) videoRef.current.muted = false;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!isFullscreen) {
      videoContainerRef.current.requestFullscreen &&
        videoContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen && document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Cleanup the object URL on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  function handleSaveScript(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    toast({
      title: "Script Saved",
      description: "Your Python script has been saved successfully.",
    });
    // Here you could add logic to save the script to a server or local storage if needed.
    console.log("Python script saved:", pythonScript);
  }
  function handleScriptChange(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void {
    setPythonScript(event.target.value);
  }
  function handleMetadataLoaded(
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ): void {
    const videoElement = event.currentTarget;
    setDuration(videoElement.duration);
    setCurrentTime(0); // Reset current time to 0 when metadata is loaded
  }
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
            description="Upload football footage and process it with our AI model"
          />

          {/* Video Upload Card */}
          <Card>
            <CardHeader>
              <CardTitle>Video Upload</CardTitle>
              <CardDescription>
                Upload a video file for processing
              </CardDescription>
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
                      <p className="text-sm font-medium">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-xs text-gray-500">
                        MP4, MOV, or AVI up to 100MB
                      </p>
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
                      <div
                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transition-opacity duration-300 ${
                          showControls || !isPlaying
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
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
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-white hover:bg-white/20"
                              onClick={toggleMute}
                            >
                              {isMuted ? (
                                <VolumeX className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                            </Button>
                            <Slider
                              value={[isMuted ? 0 : volume]}
                              min={0}
                              max={1}
                              step={0.1}
                              onValueChange={handleVolumeChange}
                              className="h-1"
                            />
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
                          : `${((videoFile?.size || 0) / (1024 * 1024)).toFixed(
                              2
                            )} MB`}
                        )
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleUploadClick}
                        >
                          Change
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRemoveVideo}
                        >
                          <X className="h-4 w-4 mr-1" /> Remove
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
                  <Button
                    className="flex-1"
                    onClick={handleRunAnalysis}
                    disabled={!videoFile || isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" /> Run Analysis
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {outputVideoUrl && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Processed Video</CardTitle>
                <CardDescription>
                  Preview of the processed video
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="aspect-video bg-black rounded-lg overflow-hidden relative group"
                  onMouseEnter={() => setOutputShowControls(true)}
                  onMouseLeave={() => setOutputShowControls(false)}
                >
                  <video
                    ref={outputVideoRef}
                    src={outputVideoUrl}
                    className="w-full h-full"
                    onTimeUpdate={handleOutputTimeUpdate}
                    onLoadedMetadata={handleOutputMetadataLoaded}
                    onEnded={() => setOutputIsPlaying(false)}
                    onPlay={() => setOutputIsPlaying(true)}
                    onPause={() => setOutputIsPlaying(false)}
                    playsInline
                  />
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transition-opacity duration-300 ${
                      outputShowControls || !outputIsPlaying
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <div className="mb-2">
                      <Slider
                        value={[outputCurrentTime]}
                        min={0}
                        max={outputDuration || 100}
                        step={0.1}
                        onValueChange={handleOutputSeek}
                        className="h-1"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-white/20"
                          onClick={toggleOutputPlay}
                        >
                          {outputIsPlaying ? (
                            <span className="h-4 w-4 block border-l-2 border-r-2 border-white" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <span className="text-xs text-white">
                          {formatTime(outputCurrentTime)} /{" "}
                          {formatTime(outputDuration)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-white/20"
                          onClick={toggleOutputMute}
                        >
                          {outputIsMuted ? (
                            <VolumeX className="h-4 w-4" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Slider
                          value={[outputIsMuted ? 0 : outputVolume]}
                          min={0}
                          max={1}
                          step={0.1}
                          onValueChange={handleOutputVolumeChange}
                          className="h-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white hover:bg-white/20"
                          onClick={() => {
                            if (outputVideoRef.current?.requestFullscreen) {
                              outputVideoRef.current.requestFullscreen();
                            }
                          }}
                        >
                          <Maximize className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Python Script Editor Card (Optional) */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Python Script Editor</CardTitle>
              <CardDescription>
                Edit the Python script for video analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  className="font-mono text-sm h-[300px] resize-none"
                  value={pythonScript}
                  onChange={handleScriptChange}
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleSaveScript}
                  >
                    <Save className="h-4 w-4 mr-2" /> Save Script
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setPythonScript(DEFAULT_PYTHON_SCRIPT)}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" /> Reset Script
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Alert className="mt-6">
            <AlertDescription>
              <p className="mb-2 font-medium">
                How to use the Python Analysis tool:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>
                  Upload a video file of a football match or training session
                </li>
                <li>Customize the Python script if needed</li>
                <li>Click "Run Analysis" to process the video</li>
                <li>View the processed video in the output box</li>
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
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:underline"
            >
              About
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:underline"
            >
              Privacy
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}

// Default Python script for video analysis (if needed for editor)
const DEFAULT_PYTHON_SCRIPT = `import cv2
import numpy as np
# ... rest of your python script code ...`;
