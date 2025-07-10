chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed — background running");
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureAudio") {
    chrome.tabCapture.capture({ audio: true, video: false }, (stream) => {
      if (chrome.runtime.lastError) {
        console.error("Capture error:", chrome.runtime.lastError.message);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
        return;
      }

      const audio = new Audio();
      audio.srcObject = stream;
      audio.play();
      console.log("Audio stream started");

      sendResponse({ success: true });
    });

    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});