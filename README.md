# Google Meet Auto Settings

A Chrome extension that automatically controls camera and microphone settings for Google Meet meetings.

## Features

- Automatically disable camera and microphone by default when joining meetings
- Customizable default settings through the extension popup
- Quick toggle controls available directly in the meeting interface
- Settings persist across browser sessions
- Modern, privacy-friendly, and open source

## Installation

### Manual (Unpacked) Installation

1. **Download or clone this repository** (or get the ZIP from the author)
2. **Unzip** the folder if you received a ZIP file
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Click **"Load unpacked"** and select the extension directory (the folder with `manifest.json`)

### Chrome Web Store (coming soon)
Once approved, you'll be able to install this extension directly from the Chrome Web Store. (Link will be added here after publishing.)

## Usage

1. Click the extension icon in your Chrome toolbar to access settings
2. Configure your default camera and microphone settings using the modern toggles
3. When joining a Google Meet meeting, your settings will be automatically applied
4. Use the toggle controls directly below the mic and camera buttons in Google Meet to quickly set your default for future meetings

## Development

The extension consists of the following files:
- `manifest.json`: Extension configuration
- `content.js`: Main functionality for controlling camera and microphone
- `popup.html` and `popup.js`: Extension settings interface
- `background.js`: Background tasks and initialization
- `icon16.png`, `icon48.png`, `icon128.png`: Extension icons

## Privacy
This extension does **not** collect, store, or transmit any personal data. All settings are stored locally in your browser.

## License

MIT License 