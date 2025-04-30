document.addEventListener('DOMContentLoaded', () => {
  // Load saved settings
  chrome.storage.sync.get(['cameraEnabled', 'micEnabled'], (result) => {
    document.getElementById('camera-enabled').checked = result.cameraEnabled === false;
    document.getElementById('mic-enabled').checked = result.micEnabled === false;
  });

  // Save settings when changed
  document.getElementById('camera-enabled').addEventListener('change', (e) => {
    chrome.storage.sync.set({ cameraEnabled: !e.target.checked });
  });

  document.getElementById('mic-enabled').addEventListener('change', (e) => {
    chrome.storage.sync.set({ micEnabled: !e.target.checked });
  });
}); 