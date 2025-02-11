# OBS Control Backend

This project provides a backend service that connects to OBS (Open Broadcaster Software) using WebSockets and `obs-websocket-js`. It provides API endpoints to fetch the current status and real-time updates from OBS, which can be consumed by a frontend client (e.g., Svelte) for monitoring and control.

## Features

- Connect to OBS using WebSockets
- Fetch real-time updates from OBS
- Provide API endpoints to get current OBS status
- Support for real-time updates via WebSockets
- Secure setup with Helmet, XSS Clean, and CORS

## Installation

### Clone the repository:

```bash
git clone https://github.com/xdeaZeineb/OBS-control.git
cd obs-control-backend
```

### Install the dependencies:

```bash
npm install
```

### Configure OBS connection:

Ensure OBS is running and the WebSocket server is enabled. Update the OBS WebSocket address and password in the code as needed.

## Usage

### Start the server:

```bash
npm start
```

The server will be running on [http://localhost:8080](http://localhost:8080).

## API Endpoints

### Health Check

Check if the server is running:

```http
GET /health
```

### Start recording

Start recording on OBS:

```http
POST /obs/start-recording
```

### Stop recording

Stop recording on OBS:

```http
POST /obs/stop-recording
```

### Current filename

fetch current recording filename in OBS:

```http
GET /obs/current-filename
```

### Switch scene

Switch scene in OBS:

```http
POST /obs/switch-scene
```

### List of scenes

fetch list of available scenes in OBS:

```http
GET /obs/scenes
```

## WebSocket Events

The backend also supports WebSocket connections for real-time updates. Connect to the WebSocket server at `ws://localhost:8080`.

### OBS Events

The following OBS events are supported and will be sent to the connected WebSocket clients:

- `CurrentProgramSceneChanged`
- `SceneNameChanged`
- `SceneCreated`
- `RecordStateChanged`
- `RecordFileChanged`

## Dependencies

- `express` for building the HTTP server and API endpoints
- `http` and `ws` for WebSocket communication
- `obs-websocket-js` for connecting to OBS
- `helmet`, `xss-clean`, and `cors` for security

## License

This project is licensed under the MIT License.
