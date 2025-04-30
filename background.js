// Initialize default settings if they don't exist
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(['cameraEnabled', 'micEnabled'], (result) => {
    if (result.cameraEnabled === undefined) {
      chrome.storage.sync.set({ cameraEnabled: true });
    }
    if (result.micEnabled === undefined) {
      chrome.storage.sync.set({ micEnabled: true });
    }
  });
}); 