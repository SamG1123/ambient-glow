# Ambient Glow for YouTube

A lightweight Chrome extension that adds a color-matched ambient glow around the YouTube video player.

## Overview

This extension injects a small content script on `https://www.youtube.com/*`, samples video frames, and renders a blurred glow canvas behind the player to create an ambient lighting effect.

## Features

- Ambient glow based on the current YouTube video frame
- Popup controls for:
  - Enable/disable
  - Blur
  - Spread
  - Brightness
  - Saturation
  - Opacity
- Settings persisted with `chrome.storage.sync`
- Handles common playback states (initial load, fullscreen behavior, paused/unready video)

## Demo / Preview

No hosted demo is included in this repository.

To preview locally, load the extension in Chrome (see installation below), open a YouTube video, and adjust settings from the extension popup.

## Installation (Developer)

1. Clone this repository.
2. Open `chrome://extensions` in Google Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select your cloned repository folder (the one containing `manifest.json`).

## Usage

1. Navigate to any YouTube page (`https://www.youtube.com/*`).
2. Start playing a video.
3. Click the extension icon to open the popup.
4. Tune glow settings with the sliders/checkbox.

## Available Scripts

This repository currently does not define npm/package scripts or a build step. The extension runs directly from the source files.

## Project Structure

```text
ambient-glow/
├── manifest.json      # Chrome Extension (MV3) manifest
├── content.js         # Glow rendering and sync settings listener
├── content.css        # Player/canvas styling
├── popup.html         # Popup UI
├── popup.js           # Popup settings binding and storage writes
└── icons/
    └── icon128.png
```

## Configuration

Default runtime values are defined in `content.js` and `popup.js`:

- `enabled: true`
- `blur: 60`
- `spread: 1.25`
- `brightness: 1.3`
- `saturate: 1.6`
- `opacity: 0.9`

They are stored in `chrome.storage.sync` when changed from the popup.

## Contributing

1. Make changes in this repository.
2. Reload the unpacked extension in `chrome://extensions`.
3. Verify behavior on YouTube pages.
4. Open a pull request with a clear summary of changes.

## License

No license file is currently included in this repository.
