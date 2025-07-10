import React, { useState } from 'react'

export default function Popup() {
  const [isCapturing, setIsCapturing] = useState(false)

  const startCapture = () => {
    chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
      if (chrome.runtime.lastError) {
        console.error("Capture error:", chrome.runtime.lastError.message)
        return
      }

      setIsCapturing(true)
      const audio = new Audio()
      audio.srcObject = stream
      audio.play()

      console.log("Audio stream started")
    })
  }

  return (
    <div style={{ padding: '1rem', width: '300px', fontFamily: 'sans-serif' }}>
      <h2>🎓 Virtual Class Assistant</h2>
      <p>Capture tab audio and summarize lectures.</p>
      <button onClick={startCapture}>
        {isCapturing ? "Capturing..." : "Start Recording"}
      </button>
    </div>
  )
}
