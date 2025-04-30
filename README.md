# Google Meet Auto Settings

A Chrome extension that automatically controls camera and microphone settings for Google Meet meetings.

## Features

- Automatically disable camera and microphone by default when joining meetings
- Customizable default settings through the extension popup
- Quick toggle controls available directly in the meeting interface
- Settings persist across browser sessions

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon in your Chrome toolbar to access settings
2. Configure your default camera and microphone settings
3. When joining a Google Meet meeting, your settings will be automatically applied
4. Use the toggle controls in the bottom right corner of the meeting to quickly enable/disable camera and microphone

## Development

The extension consists of the following files:
- `manifest.json`: Extension configuration
- `content.js`: Main functionality for controlling camera and microphone
- `popup.html` and `popup.js`: Extension settings interface
- `background.js`: Background tasks and initialization
- `styles.css`: Styling for the popup interface

## License

MIT License 