// // pages/api/upload-video.ts
// import { IncomingForm, File } from 'formidable';
// import fs from 'fs';
// import os from 'os';
// import path from 'path';
// import type { NextApiRequest, NextApiResponse } from 'next';

// // Disable Next.js default bodyParser (we handle multipart form-data ourselves)
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'POST') {
//         res.status(405).json({ error: 'Method not allowed' });
//         return;
//     }

//     const form = new IncomingForm();

//     form.parse(req, (err, _fields, files) => {
//         if (err) {
//             console.error('Error parsing form:', err);
//             res.status(500).json({ error: 'Failed to parse upload' });
//             return;
//         }

//         // Expect the file field is named "video"
//         const videoFile = Array.isArray(files.video) ? files.video[0] : files.video;
//         if (!videoFile || Array.isArray(videoFile)) {
//             res.status(400).json({ error: 'No valid video file uploaded' });
//             return;
//         }

//         // Define where to save the file – in your python/input_videos folder
//         const inputVideosDir = path.join(process.cwd(), 'python', 'input_videos');
//         if (!fs.existsSync(inputVideosDir)) {
//             fs.mkdirSync(inputVideosDir, { recursive: true });
//         }
//         // Create a unique filename (using Date.now, or you can use a UUID library)
//         const uniqueName = `video_${Date.now()}_${path.basename(videoFile.originalFilename || 'video.mp4')}`;
//         const newPath = path.join(inputVideosDir, uniqueName);

//         fs.rename(videoFile.filepath, newPath, (renameErr) => {
//             if (renameErr) {
//                 console.error('Error saving video file:', renameErr);
//                 res.status(500).json({ error: 'Failed to save video file' });
//                 return;
//             }

//             res.status(200).json({ success: true, fileName: uniqueName, filePath: newPath });
//         });
//     });
// }
