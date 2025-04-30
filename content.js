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

    // Add custom styles for the toggle
    if (!document.getElementById('custom-toggle-style')) {
        const style = document.createElement('style');
        style.id = 'custom-toggle-style';
        style.textContent = `
        .custom-switch-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 8px;
            margin-top: 10px;
            background: none;
            border-radius: 14px;
            padding: 0;
            box-shadow: none;
            cursor: pointer;
            user-select: none;
            transition: background 0.2s;
            position: relative;
        }
        .custom-switch {
            position: relative;
            width: 36px;
            height: 20px;
            margin-bottom: 0;
        }
        .custom-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .custom-slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #bbb;
            border-radius: 20px;
            transition: background 0.2s;
            box-shadow: 0 2px 8px rgba(162,89,247,0.10);
        }
        .custom-switch input:checked + .custom-slider {
            background: linear-gradient(90deg, #a259f7 0%, #6a82fb 100%);
        }
        .custom-slider:before {
            position: absolute;
            content: '';
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background: #fff;
            border-radius: 50%;
            transition: transform 0.2s;
            box-shadow: 0 1px 2px rgba(0,0,0,0.10);
        }
        .custom-switch input:checked + .custom-slider:before {
            transform: translateX(16px);
        }
        .custom-switch-label .custom-tooltip {
            visibility: hidden;
            opacity: 0;
            width: 220px;
            background: #222;
            color: #fff;
            text-align: left;
            border-radius: 6px;
            padding: 6px 10px;
            position: absolute;
            z-index: 1001;
            left: 50%;
            bottom: 110%;
            transform: translateX(-50%);
            font-size: 11px;
            font-weight: 400;
            pointer-events: none;
            transition: opacity 0.2s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.18);
        }
        .custom-switch-label .custom-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: #222 transparent transparent transparent;
        }
        .custom-switch-label:hover .custom-tooltip {
            visibility: visible;
            opacity: 1;
        }
        `;
        document.head.appendChild(style);
    }

    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'custom-switch-label';
    toggleLabel.title = '';

    const switchDiv = document.createElement('span');
    switchDiv.className = 'custom-switch';

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.id = 'custom-mic-toggle';

    const slider = document.createElement('span');
    slider.className = 'custom-slider';

    switchDiv.appendChild(toggle);
    switchDiv.appendChild(slider);

    // Tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = 'If enabled, your mic will be off by default when you join.';

    toggleLabel.appendChild(switchDiv);
    toggleLabel.appendChild(tooltip);
    micContainer.appendChild(toggleLabel);

    chrome.storage.sync.get(['micEnabled'], (result) => {
        toggle.checked = result.micEnabled === false;
    });

    toggle.addEventListener('change', (e) => {
        chrome.storage.sync.set({ micEnabled: !e.target.checked });
    });
}

// Function to inject the camera toggle next to the camera button
function injectCameraToggle() {
    const camContainer = document.querySelector('div.utiQxe');
    if (!camContainer || camContainer.querySelector('#custom-cam-toggle')) return;

    // Add custom styles for the toggle (already added by mic, but safe to check)
    if (!document.getElementById('custom-toggle-style')) {
        const style = document.createElement('style');
        style.id = 'custom-toggle-style';
        style.textContent = `
        .custom-switch-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 8px;
            margin-top: 10px;
            background: none;
            border-radius: 14px;
            padding: 0;
            box-shadow: none;
            cursor: pointer;
            user-select: none;
            transition: background 0.2s;
            position: relative;
        }
        .custom-switch {
            position: relative;
            width: 36px;
            height: 20px;
            margin-bottom: 0;
        }
        .custom-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .custom-slider {
            position: absolute;
            cursor: pointer;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #bbb;
            border-radius: 20px;
            transition: background 0.2s;
            box-shadow: 0 2px 8px rgba(162,89,247,0.10);
        }
        .custom-switch input:checked + .custom-slider {
            background: linear-gradient(90deg, #a259f7 0%, #6a82fb 100%);
        }
        .custom-slider:before {
            position: absolute;
            content: '';
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background: #fff;
            border-radius: 50%;
            transition: transform 0.2s;
            box-shadow: 0 1px 2px rgba(0,0,0,0.10);
        }
        .custom-switch input:checked + .custom-slider:before {
            transform: translateX(16px);
        }
        .custom-switch-label .custom-tooltip {
            visibility: hidden;
            opacity: 0;
            width: 220px;
            background: #222;
            color: #fff;
            text-align: left;
            border-radius: 6px;
            padding: 6px 10px;
            position: absolute;
            z-index: 1001;
            left: 50%;
            bottom: 110%;
            transform: translateX(-50%);
            font-size: 11px;
            font-weight: 400;
            pointer-events: none;
            transition: opacity 0.2s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.18);
        }
        .custom-switch-label .custom-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: #222 transparent transparent transparent;
        }
        .custom-switch-label:hover .custom-tooltip {
            visibility: visible;
            opacity: 1;
        }
        `;
        document.head.appendChild(style);
    }

    const toggleLabel = document.createElement('label');
    toggleLabel.className = 'custom-switch-label';
    toggleLabel.title = '';

    const switchDiv = document.createElement('span');
    switchDiv.className = 'custom-switch';

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.id = 'custom-cam-toggle';

    const slider = document.createElement('span');
    slider.className = 'custom-slider';

    switchDiv.appendChild(toggle);
    switchDiv.appendChild(slider);

    // Tooltip
    const tooltip = document.createElement('span');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = 'If enabled, your camera will be off by default when you join.';

    toggleLabel.appendChild(switchDiv);
    toggleLabel.appendChild(tooltip);
    camContainer.appendChild(toggleLabel);

    chrome.storage.sync.get(['cameraEnabled'], (result) => {
        toggle.checked = result.cameraEnabled === false;
    });

    toggle.addEventListener('change', (e) => {
        chrome.storage.sync.set({ cameraEnabled: !e.target.checked });
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