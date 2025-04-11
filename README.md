# ⚽ Scoutio

**Scoutio** is an AI-powered web application for analyzing football match videos using advanced object detection models like **YOLOv5x** and **YOLOv8x**. It provides **individual performance scores**, **player statistics**, and **match breakdowns**—all through an intuitive and responsive interface built with **Next.js**, **TypeScript**, and **Tailwind CSS**, with a Python-powered backend handling video processing and AI inference.

---

## 🧠 Features

- 🎯 **Player Detection & Tracking:** Uses YOLOv5x and YOLOv8x for high-accuracy detection and tracking.
- ⚡ **Performance Scoring:** Assigns match performance scores for each player based on movements and interactions.
- 🧾 **Detailed Analytics:** Visual and numerical stats for team and individual players.
- 🔐 **Player Accounts:** Each player has their own profile to view past matches and performance.
- 📹 **Video Uploads:** Upload match footage for automatic AI-powered breakdowns.

---

## 🛠 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) – React-based framework for server-side rendering
- [TypeScript](https://www.typescriptlang.org/) – Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework

### Backend
- [Python](https://www.python.org/) – Core video analysis and inference logic
- [YOLOv5x / YOLOv8x](https://github.com/ultralytics/yolov5) – Object detection models
- [OpenCV](https://opencv.org/) – Video frame processing and visualization
- [FastAPI / Flask] – (based on your setup) for handling API requests

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- pip + virtualenv (optional but recommended)

---

### Frontend Setup

```bash
pnpm run dev
```

---

### Inference Models

1. Download YOLOv5x and YOLOv8x pretrained weights.
2. Place them in the `models/` directory.

---

## 🧪 Example

Upload a match video → Players detected and tracked → Stats & scores calculated → Players view results in their accounts.

---

## 📌 To-Do

- [ ] Improve accuracy with real-time feedback loop
- [ ] Add timeline-based match highlights
- [ ] Mobile responsive improvements
- [ ] Add accessabilty for players
- [ ] Add comprehensive leaderboard

---

## 🤝 Contact

Built with ❤️ by 
1. [Sulaiman Alluhaib]([https://github.com/SulaimanAlluhaib])
2. [Saeed Lababidi]([https://github.com/Saeed-Lababidi])
3. [Meer Husamuddin]([https://github.com/MeerHusam])
For questions, collaborations, or feedback, feel free to reach out!
