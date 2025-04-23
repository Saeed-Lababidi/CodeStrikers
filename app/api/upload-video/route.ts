// app/api/upload-video/route.ts
import { NextResponse } from "next/server";
import { IncomingForm } from "formidable";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import type { IncomingMessage } from "http";

export const config = {
    api: {
        bodyParser: false,
    },
};

// Convert Next.js Request to a Node Readable stream with headers
async function getNodeReq(req: Request): Promise<IncomingMessage> {
    const buf = await req.arrayBuffer();
    const stream = Readable.from(Buffer.from(buf));
    // Copy headers from the Next.js Request into the stream.
    // req.headers is an instance of Headers, so we convert it to a plain object.
    const headers = Object.fromEntries(req.headers.entries());
    // The IncomingMessage requires a headers property; attach it to the stream.
    return Object.assign(stream, { headers }) as unknown as IncomingMessage;
}

export async function POST(req: Request) {
    try {
        const nodeReq = await getNodeReq(req);

        return new Promise<NextResponse>((resolve) => {
            const form = new IncomingForm();

            form.parse(nodeReq, (err, _fields, files) => {
                if (err) {
                    console.error("Error parsing form:", err);
                    resolve(NextResponse.json({ error: "Failed to parse upload" }, { status: 500 }));
                    return;
                }

                const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;
                if (!videoFile || Array.isArray(videoFile)) {
                    resolve(NextResponse.json({ error: "No valid video file uploaded" }, { status: 400 }));
                    return;
                }

                const inputVideosDir = path.join(process.cwd(), "python", "input_videos");
                if (!fs.existsSync(inputVideosDir)) {
                    fs.mkdirSync(inputVideosDir, { recursive: true });
                }
                const uniqueName = `video_${Date.now()}_${path.basename(videoFile.originalFilename || "video.mp4")}`;
                const newPath = path.join(inputVideosDir, uniqueName);

                fs.rename(videoFile.filepath, newPath, (renameErr) => {
                    if (renameErr) {
                        console.error("Error saving video file:", renameErr);
                        resolve(NextResponse.json({ error: "Failed to save video file" }, { status: 500 }));
                        return;
                    }
                    resolve(NextResponse.json({ success: true, fileName: uniqueName, filePath: newPath }));
                });
            });
        });
    } catch (error: any) {
        console.error("Error in upload-video endpoint:", error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}
