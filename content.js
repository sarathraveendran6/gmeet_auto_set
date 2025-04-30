// Function to disable camera and mic
function disableMedia() {
  // Get all video elements
  const videoElements = document.querySelectorAll('video');
  videoElements.forEach(video => {
    if (video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach(track => {
        if (track.kind === 'video') {
          track.enabled = false;
        }
      });
    }
  });

  // Get all audio elements
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach(audio => {
    if (audio.srcObject) {
      const tracks = audio.srcObject.getTracks();
      tracks.forEach(track => {
        if (track.kind === 'audio') {
          track.enabled = false;
        }
      });
    }
  });
}

// Function to toggle microphone
function toggleMicrophone(enable) {
    const micButton = document.querySelector('[jsname="hw0c9"][aria-label*="microphone"]');
    if (micButton) {
        const isMuted = micButton.getAttribute('data-is-muted') === 'true';
        if ((enable && isMuted) || (!enable && !isMuted)) {
            micButton.click();
        }
    }
}

// Function to toggle camera
function toggleCamera(enable) {
    const cameraButton = document.querySelector('[jsname="psRWwc"][aria-label*="camera"]');
    if (cameraButton) {
        const isMuted = cameraButton.getAttribute('data-is-muted') === 'true';
        if ((enable && isMuted) || (!enable && !isMuted)) {
            cameraButton.click();
        }
    }
}

// Function to create and inject the toggle UI
function createToggleUI() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.zIndex = '1000';
    container.style.backgroundColor = 'white';
    container.style.padding = '10px';
    container.style.borderRadius = '5px';
    container.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

    const cameraToggle = document.createElement('div');
    cameraToggle.innerHTML = `
        <label>
            <input type="checkbox" id="camera-toggle">
            Camera
        </label>
    `;

    const micToggle = document.createElement('div');
    micToggle.innerHTML = `
        <label>
            <input type="checkbox" id="mic-toggle">
            Microphone
        </label>
    `;

    container.appendChild(cameraToggle);
    container.appendChild(micToggle);
    document.body.appendChild(container);

    // Load saved settings
    chrome.storage.sync.get(['cameraEnabled', 'micEnabled'], (result) => {
        document.getElementById('camera-toggle').checked = result.cameraEnabled !== false;
        document.getElementById('mic-toggle').checked = result.micEnabled !== false;
        
        // Apply initial settings
        toggleCamera(result.cameraEnabled !== false);
        toggleMicrophone(result.micEnabled !== false);
    });

    // Add event listeners
    document.getElementById('camera-toggle').addEventListener('change', (e) => {
        chrome.storage.sync.set({ cameraEnabled: e.target.checked });
        // Do NOT toggle the camera immediately
    });

    document.getElementById('mic-toggle').addEventListener('change', (e) => {
        chrome.storage.sync.set({ micEnabled: e.target.checked });
        // Do NOT toggle the mic immediately
    });
}

// Function to inject the mic toggle next to the mic button
function injectMicToggle() {
    const micContainer = document.querySelector('div.Pr6Uwe');
    if (!micContainer || micContainer.querySelector('#custom-mic-toggle')) return;

    const toggleLabel = document.createElement('label');
    toggleLabel.style.display = 'flex';
    toggleLabel.style.alignItems = 'center';
    toggleLabel.style.marginLeft = '12px';
    toggleLabel.style.fontSize = '12px';
    toggleLabel.style.cursor = 'pointer';
    toggleLabel.title = 'Auto-mute mic on join';

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.id = 'custom-mic-toggle';
    toggle.style.marginRight = '4px';

    const span = document.createElement('span');
    span.textContent = 'Auto-mute';

    toggleLabel.appendChild(toggle);
    toggleLabel.appendChild(span);
    micContainer.appendChild(toggleLabel);

    chrome.storage.sync.get(['micEnabled'], (result) => {
        // If micEnabled is false (auto-mute), toggle is checked
        toggle.checked = result.micEnabled === false;
    });

    toggle.addEventListener('change', (e) => {
        // If checked, set micEnabled to false (auto-mute); if unchecked, set to true
        chrome.storage.sync.set({ micEnabled: !e.target.checked });
        // Do NOT toggle the mic immediately
    });
}

// Function to inject the camera toggle next to the camera button
function injectCameraToggle() {
    const camContainer = document.querySelector('div.utiQxe');
    if (!camContainer || camContainer.querySelector('#custom-cam-toggle')) return;

    const toggleLabel = document.createElement('label');
    toggleLabel.style.display = 'flex';
    toggleLabel.style.alignItems = 'center';
    toggleLabel.style.marginLeft = '12px';
    toggleLabel.style.fontSize = '12px';
    toggleLabel.style.cursor = 'pointer';
    toggleLabel.title = 'Auto-mute camera on join';

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.id = 'custom-cam-toggle';
    toggle.style.marginRight = '4px';

    const span = document.createElement('span');
    span.textContent = 'Auto-mute camera';

    toggleLabel.appendChild(toggle);
    toggleLabel.appendChild(span);
    camContainer.appendChild(toggleLabel);

    chrome.storage.sync.get(['cameraEnabled'], (result) => {
        // If cameraEnabled is false (auto-mute), toggle is checked
        toggle.checked = result.cameraEnabled === false;
    });

    toggle.addEventListener('change', (e) => {
        // If checked, set cameraEnabled to false (auto-mute); if unchecked, set to true
        chrome.storage.sync.set({ cameraEnabled: !e.target.checked });
        // Do NOT toggle the camera immediately
    });
}

// Wait for the page to load and then apply settings
window.addEventListener('load', () => {
    if (window.location.href.includes('meet.google.com')) {
        // Inject the mic and camera toggles when the containers are available
        const interval = setInterval(() => {
            const micContainer = document.querySelector('div.Pr6Uwe');
            const camContainer = document.querySelector('div.utiQxe');
            if (micContainer) injectMicToggle();
            if (camContainer) injectCameraToggle();
            if (micContainer && camContainer) clearInterval(interval);
        }, 500);

        // Apply settings after a short delay to ensure UI is loaded
        setTimeout(() => {
            chrome.storage.sync.get(['cameraEnabled', 'micEnabled'], (result) => {
                toggleCamera(result.cameraEnabled !== false);
                toggleMicrophone(result.micEnabled !== false);
            });
        }, 2000);
    }
}); 