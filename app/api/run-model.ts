// // pages/api/run-model.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { spawn } from 'child_process';
// import path from 'path';
// import fs from 'fs';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { fileName } = req.body;
//   if (!fileName || typeof fileName !== 'string') {
//     return res.status(400).json({ error: 'Missing or invalid fileName' });
//   }

//   // Build full paths for the input and output video files
//   const inputPath = path.join(process.cwd(), 'python', 'input_videos', fileName);
//   // For the output, we write to python/output_videos
//   const outputFileName = `output_${fileName}`;
//   const outputPath = path.join(process.cwd(), 'python', 'output_videos', outputFileName);

//   // Check that the input file exists
//   if (!fs.existsSync(inputPath)) {
//     return res.status(400).json({ error: 'Input video file not found' });
//   }

//   // Construct the Python script path (assumed in the python folder)
//   const pythonScriptPath = path.join(process.cwd(), 'python', 'main.py');

//   const pythonProcess = spawn('python', [pythonScriptPath, inputPath, outputPath]);

//   let stdoutData = '';
//   let stderrData = '';

//   pythonProcess.stdout.on('data', (data) => {
//     stdoutData += data.toString();
//   });
//   pythonProcess.stderr.on('data', (data) => {
//     stderrData += data.toString();
//   });

//   pythonProcess.on('close', (code) => {
//     if (code !== 0) {
//       console.error('Python script error:', stderrData);
//       return res.status(500).json({ success: false, error: stderrData || 'Processing failed' });
//     }
//     // Once processing is complete, copy the output video into public/output_videos so that it can be served
//     const publicOutputDir = path.join(process.cwd(), 'public', 'output_videos');
//     if (!fs.existsSync(publicOutputDir)) {
//       fs.mkdirSync(publicOutputDir, { recursive: true });
//     }
//     const publicFilePath = path.join(publicOutputDir, outputFileName);
//     fs.copyFile(outputPath, publicFilePath, (copyErr) => {
//       if (copyErr) {
//         console.error('Error copying output video to public:', copyErr);
//         return res.status(500).json({ success: false, error: 'Failed to copy output video to public folder' });
//       }
//       // Return a public URL for the output video.
//       // Assume your Next.js public folder is served at the root.
//       const videoURL = `/output_videos/${outputFileName}`;
//       return res.status(200).json({ success: true, videoURL, message: stdoutData });
//     });
//   });
// }
