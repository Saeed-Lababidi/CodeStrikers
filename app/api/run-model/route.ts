import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export const config = {
    runtime: "nodejs",
};

export async function POST(req: Request) {
    try {
        // Parse the request body as JSON to get the fileName
        const { fileName } = await req.json();
        if (!fileName || typeof fileName !== "string") {
            return NextResponse.json({ success: false, error: "Missing or invalid fileName" }, { status: 400 });
        }

        // Construct the input and output video paths
        const inputPath = path.join(process.cwd(), "python", "input_videos", fileName);
        const outputFileName = `output_${fileName}`;
        const outputPath = path.join(process.cwd(), "python", "output_videos", outputFileName);

        if (!fs.existsSync(inputPath)) {
            return NextResponse.json({ success: false, error: "Input video file not found" }, { status: 400 });
        }

        // Construct the Python script path (assumed in the python folder)
        const pythonScriptPath = path.join(process.cwd(), "python", "main.py");

        // Spawn the Python process with input and output paths as arguments.
        const pythonProcess = spawn("python", [pythonScriptPath, inputPath, outputPath]);

        let stdoutData = "";
        let stderrData = "";

        pythonProcess.stdout.on("data", (data) => {
            stdoutData += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
            stderrData += data.toString();
        });

        return await new Promise<NextResponse>((resolve) => {
            pythonProcess.on("close", (code) => {
                if (code !== 0) {
                    console.error("Python script error:", stderrData);
                    resolve(
                        NextResponse.json({ success: false, error: stderrData || "Python script failed" }, { status: 500 })
                    );
                    return;
                }

                // Copy the output video to the public directory so it can be accessed externally
                const publicOutputDir = path.join(process.cwd(), "public", "output_videos");
                if (!fs.existsSync(publicOutputDir)) {
                    fs.mkdirSync(publicOutputDir, { recursive: true });
                }
                const publicFilePath = path.join(publicOutputDir, outputFileName);

                fs.copyFile(outputPath, publicFilePath, (copyErr) => {
                    if (copyErr) {
                        console.error("Error copying output video:", copyErr);
                        resolve(
                            NextResponse.json({ success: false, error: "Failed to copy output video to public folder" }, { status: 500 })
                        );
                        return;
                    }

                    // Construct the public URL (assuming your public folder is served from the root)
                    const videoURL = `/output_videos/${outputFileName}`;
                    resolve(NextResponse.json({ success: true, videoURL, message: stdoutData }));
                });
            });
        });
    } catch (error: any) {
        console.error("Error in run-model endpoint:", error);
        return NextResponse.json({ success: false, error: error.message || "Server error" }, { status: 500 });
    }
}
