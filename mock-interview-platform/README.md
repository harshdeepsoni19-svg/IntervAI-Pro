# IntervAI Pro: AI-Based Mock Interview & Career Preparation Platform

> **USP:** *"Practice like a real interview. Improve with AI. Get discovered by companies."*

IntervAI Pro is a multimodal interview simulation and direct recruitment ecosystem designed to prepare candidates for modern corporate hiring. Beyond testing technical knowledge, it evaluates non-verbal composure, eye contact, body language, speaking rhythm, etiquette, and structured communication in **English, Hindi, and Gujarati**. High-performing candidates (score ≥ 80%) unlock direct discovery by partner companies.

---

## 🌟 Core System Highlights

### 1. Multimodal Vision Pipeline (`src/vision/vision_pipeline.js`)
- **WebRTC Camera Stream**: Captures video locally without streaming raw video bytes to remote servers.
- **MediaPipe Landmark Telemetry**:
  - **Eye Contact & Gaze Angle**: Measures pupil gaze deviation from the screen center.
  - **Head Pose Estimation**: Evaluates pitch, roll, and yaw angles to flag notes/screen reading or distraction.
  - **Posture & Shoulder Symmetry**: Identifies slouching, leaning, or nervous swaying.
  - **Blink Rate & Tension**: Detects signs of acute anxiety or micro-fidgeting.

### 2. Multilingual Speech Pipeline (`src/audio/speech_pipeline.js`)
- **Live Multilingual ASR**: Supports **English (`en-US`)**, **Hindi (`hi-IN`)**, **Gujarati (`gu-IN`)**, and code-mixed **Hinglish**.
- **Words Per Minute (WPM) Cadence**: Real-time pacing tracker benchmarking against the 130–160 WPM corporate sweet spot.
- **Lexical Filler Word Detection**: Flags fillers such as *"um"*, *"basically"*, *"like"*, *"मतलब"*, *"જેમ કે"*.
- **Text-to-Speech (TTS) Avatar**: Synthesizes natural interviewer questions in the candidate's chosen language.

### 3. Dynamic AI Interview Engine (`src/ai/interview_engine.js`)
- **Stage Orchestration**: Icebreaker & Projects → Technical Deep Dive → Behavioral STAR Scenarios → Situational Edge Cases.
- **Context-Aware Adaptive Follow-ups**: Evaluates candidate responses dynamically:
  - Deepens technical questioning if the candidate shows proficiency (e.g., partition skew, cache stampedes, consistency trade-offs).
  - Guides with structured prompts if an answer lacks depth.

### 4. 360° Multimodal Diagnostic Evaluator (`src/scoring/evaluator.js`)
- Synthesizes 9 core dimensions:
  1. Technical Depth (25%)
  2. Communication Clarity (15%)
  3. Eye Contact & Gaze (10%)
  4. Body Language & Posture (10%)
  5. Fluency & Speech Rhythm (10%)
  6. Confidence & Delivery (10%)
  7. Problem Solving & Logic (10%)
  8. Professional Etiquette (5%)
  9. Answer Quality & STAR Adherence (5%)
- Generates **weakness diagnoses** with exact timestamps and **personalized micro-drills** (Zero-Filler Sprint, STAR Result Quantifier, Multilingual Fluency).

### 5. Recruiter Discovery Marketplace (`src/recruitment/marketplace.js`)
- **Verified Candidate Directory**: Candidates scoring 80%+ unlock verified profiles.
- **Filter by Role, Score, and Language**: Recruiters search pre-screened talent across English, Hindi, and Gujarati.
- **Direct Recruitment Pipeline**: 1-click candidate shortlisting and fast-track interview invitations.

---

## 📁 Project Architecture & Directory Structure

```
mock-interview-platform/
├── index.html                   # Main single-page interactive application
├── package.json                 # Project configuration & dependencies
├── README.md                    # Project documentation & guide
└── src/
    ├── ai/
    │   └── interview_engine.js  # Dynamic question banks & adaptive follow-up logic
    ├── audio/
    │   └── speech_pipeline.js   # Multilingual ASR (EN/HI/GU), WPM & filler detection, TTS
    ├── recruitment/
    │   └── marketplace.js       # Verified candidate directory, filtering, recruiter outreach
    ├── scoring/
    │   └── evaluator.js         # 360° weighted scorecard & personalized drill generator
    └── vision/
        └── vision_pipeline.js   # WebRTC camera, gaze angle, head pose & posture tracking
```

---

## 🚀 How to Run the Application

### Option 1: Direct Browser Launch (Zero Setup)
Simply open [`index.html`](file:///C:/Users/RAJAN%20SONI/.gemini/antigravity/scratch/mock-interview-platform/index.html) in your browser:
- Double-click `index.html` or open it with Google Chrome, Microsoft Edge, or Firefox.
- Works out of the box with ES Modules, WebRTC, and browser Speech APIs.

### Option 2: Local Vite Development Server
When Node.js is installed:
```bash
npm install
npm run dev
```

---

## 📑 Full Technical Architecture Document
Review the comprehensive architecture blueprint, database schema, and API flow:
- [AI Interview Platform Architecture Blueprint](file:///C:/Users/RAJAN%20SONI/.gemini/antigravity/brain/3bd613c8-f881-45de-9721-440c3235ffe3/ai_interview_platform_blueprint.md)
