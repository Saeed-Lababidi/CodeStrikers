// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    videoUploader: f({ video: { maxFileSize: "512MB" } })
        .onUploadComplete(async ({ file }) => {
            // Here, you can store metadata, trigger a background job, etc.
            console.log("Upload complete:", file.url);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
