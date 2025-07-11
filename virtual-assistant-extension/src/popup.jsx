import React, { useState, useRef } from 'react';
import './popup.css';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [transcribe, setTranscribe] = useState(false);
  const [notes, setNotes] = useState(false);
  const [alerts, setAlerts] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  // ✅ Utility to download notes as .txt file
  const downloadNotes = (content, filename = "lecture_notes.txt") => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    a.remove();
  };

  const handleRecording = () => {
    if (!isRecording) {
      chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
        if (!stream) {
          console.error("❌ Could not capture tab audio:", chrome.runtime.lastError.message);
          return;
        }

        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(audioContext.destination);

        const options = { mimeType: 'audio/webm' };
        const mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            recordedChunks.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'recorded_audio.mp3';
          a.click();
          URL.revokeObjectURL(url);
          recordedChunks.current = [];

          // Future: handle transcribe, notes, alerts
          if (transcribe || notes || alerts) {
            console.log("🛠️ Features selected:", { transcribe, notes, alerts });

            if (notes) {
              const dummyNotes = `
📌 Lecture Summary:
- Important formula: E = mc²
- Covered Quantum Mechanics and its real-world applications
- Mentioned exam question from past year paper

📅 Date: ${new Date().toLocaleDateString()}
              `;
              downloadNotes(dummyNotes);
            }
          }
        };

        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
      });
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  const handleGenerateNotesOnly = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const url = currentTab.url;

      console.log("📘 Generating notes for:", url);

      // 🚀 Simulate notes for now — later send `url` to backend
      const dummyNotes = `
📌 Instant Notes:
- YouTube Video URL: ${url}
- Auto-summary: Topic includes Linear Regression and Gradient Descent
- Recommended Reading: Chapter 4 of ML Book

📅 Date: ${new Date().toLocaleDateString()}
      `;
      downloadNotes(dummyNotes);
    });
  };

  return (
    <div className="container">
      <h2>🎓 Virtual Class Assistant</h2>

      <button onClick={handleRecording}>
        {isRecording ? "Stop & Download" : "▶️ Start Recording"}
      </button>
      <p className="caption">Captures tab audio and saves as MP3</p>

      <hr />

      <p className="mini-head">📝 Already know the topic?</p>
      <button onClick={handleGenerateNotesOnly} className="notes-button">
        Generate Notes Instantly
      </button>

      <hr />

      <div className="advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)}>
        ⚙️ {showAdvanced ? "Hide" : "Show"} Advanced Options
      </div>

      {showAdvanced && (
        <div className="advanced-options">
          <label>
            <input
              type="checkbox"
              checked={transcribe}
              onChange={() => setTranscribe(!transcribe)}
            />
            Transcribe Audio
          </label>
          <label>
            <input
              type="checkbox"
              checked={notes}
              onChange={() => setNotes(!notes)}
            />
            Generate Notes (while recording)
          </label>
          <label>
            <input
              type="checkbox"
              checked={alerts}
              onChange={() => setAlerts(!alerts)}
            />
            Real-time Alerts
          </label>
        </div>
      )}
    </div>
  );
}
