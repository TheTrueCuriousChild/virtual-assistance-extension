# 🎓 Virtual Class Assistant - Chrome Extension

A powerful Chrome extension designed for students to enhance their online lecture experience by capturing, transcribing, summarizing, and organizing lecture content directly from browser tabs in real-time.

---

## 🔥 Features

* 🎤 **Tab Audio Recording**: Capture audio from active browser tabs (Google Meet, YouTube, Zoom, etc.)
* 📝 **Smart Transcription**: Transcribes speech to text efficiently (Whisper integration coming up)
* 📌 **Important Highlights Detection**: Identify phrases like “important,” “exam,” etc.
* 📄 **Auto Notes Generator**: Extract notes intelligently from spoken content
* 🔔 **Smart Alerts**: Alert students if the teacher is calling their name or asking a question when they’re inactive
* ⏺️ **Downloadable Recordings**: Save MP3 recordings of lectures
* 📥 **Offline Functionality**: Save summaries and notes locally without relying on external APIs

---

## 📁 Project Structure

```
virtual-assistant-extension/
├── backend/                 # Whisper.cpp or backend logic (Transcription)
├── dist/                    # Compiled production build for the extension
├── public/                  # Static files
├── src/                     # Source files
│   ├── assets/              # Icons, images
│   ├── App.jsx              # Main extension popup component
│   ├── popup.jsx            # UI logic for popup
│   ├── popup.css            # Popup styling
│   └── ...
├── index.html               # Entry HTML
├── manifest.json            # Chrome extension manifest
├── vite.config.js           # Vite bundler config
├── package.json             # Project metadata
└── README.md                # You're here!
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/virtual-assistant-extension.git
cd virtual-assistant-extension
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Dev Server

```bash
npm run dev
```

### 4. Build Extension

```bash
npm run build
```

### 5. Load in Chrome

* Go to `chrome://extensions`
* Enable **Developer mode**
* Click **Load unpacked**
* Select the `dist/` folder

---

## 🎯 Roadmap

* [x] Audio recording from tab
* [x] Local download of MP3
* [x] Smart summarization setup
* [x] Whisper.cpp backend integration
* [ ] Accurate real-time note-taking
* [ ] Live alerts on name detection
* [ ] Offline transcript + notes saving
* [ ] Multi-tab handling

---

## 🤝 Contributing

We are open to contributions! Whether it’s performance improvements, UI upgrades, or smart detection logic — feel free to fork and submit a PR.

---

## 🙏 Acknowledgments

* [Whisper.cpp](https://github.com/ggerganov/whisper.cpp) for offline transcription
* React + Vite for frontend scaffolding
* Chrome Extension API

---

## 📜 License

This project is **NOT LICENSED** yet. All rights reserved by the original author for now.

---

## 🕉 Jai Shree Ram 🙏
