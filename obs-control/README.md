# OBS Control Frontend

This project provides a frontend application built with Svelte that connects to a backend service for monitoring and controlling OBS (Open Broadcaster Software). The frontend communicates with the backend to receive real-time updates and interact with OBS.

## Features

- Real-time updates from OBS
- Display current OBS status and scene information
- Start and stop recording in OBS
- Switch between different available scenes in OBS
- Logging of OBS events

### Install the dependencies:

```bash
npm install
```

## Usage

### Start the development server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:5000](http://localhost:5000).

## File Structure

```
src/
│── routes/
│   └── obs-control/
│       └── +page.svelte  # Main Svelte component for OBS control
│── stores/
│   ├── logsStore.js      # Svelte store for logging OBS events
│   └── scenesStore.js    # Svelte store for managing OBS scenes
│   └── statusStore.js    # Svelte store for managing OBS active status
```

## Components

### `+page.svelte`

This component provides the main interface for controlling OBS. It includes:

- Buttons to start and stop recording
- A dropdown to switch between scenes
- Display for the current recording filename
- A logging block to show OBS events

### `logsStore.js`

This store manages the log messages from OBS. It uses Svelte's writable store to maintain a list of log messages.

### `scenesStore.js`

This store manages the list of OBS scenes. It uses Svelte's writable store to maintain the scene data.

## Dependencies

- `svelte` for building the frontend
- `svelte/store` for managing state
- `svelte-routing` for routing (if needed)

## API Endpoints

The frontend interacts with the backend API endpoints

## Colors

### Primary Color

- **Hex:** #1F2937
- **Name:** Dark Slate Grey
- **Usage:** Backgrounds

### Secondary Color

- **Hex:** #1d283d
- **Usage:** Secondary Backgrounds

### Neutral Color

- **Hex:** #c5ccd4
- **Name:** Light Grey
- **Usage:** Text
