import React, { useState } from 'react'
import './popup.css' // make sure this path is correct

export default function Popup() {
  const [isCapturing, setIsCapturing] = useState(false)

  const startCapture = () => {
    chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
      if (chrome.runtime.lastError || !stream) {
        console.error("Capture error:", chrome.runtime.lastError?.message)
        return
      }

      setIsCapturing(true)
      console.log("✅ Audio stream started")

      // Optional: play audio to confirm it's working
      const audio = new Audio()
      audio.srcObject = stream
      audio.play()
    })
  }

  return (
    <div className="container">
      <h2>🎓 Virtual Class Assistant</h2>
      <p>Capture audio from your class tab to generate notes & summaries.</p>
      <button onClick={startCapture}>
        {isCapturing ? "Capturing..." : "Start Recording"}
      </button>
    </div>
  )
}
