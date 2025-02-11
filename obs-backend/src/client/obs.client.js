const obsClient = require("../config/obs.config");

class ObsClient {
  startRecording() {
    return obsClient.call("StartRecord");
  }

  stopRecording() {
    return obsClient.call("StopRecord");
  }

  getCurrentFilename() {
    return obsClient.call("GetProfileParameter", {
      parameterCategory: "Output",
      parameterName: "FilenameFormatting",
    });
  }

  switchScene(sceneName) {
    return obsClient.call("SetCurrentProgramScene", {
      sceneName: sceneName,
    });
  }

  getScenes() {
    return obsClient.call("GetSceneList");
  }

  getLiveUpdates(wss, obs) {
    wss.on("connection", (ws) => {
      console.log("Client connected");

      ws.send(JSON.stringify({ message: "Welcome to OBS updates" }));

      // OBS Event Handlers
      obs.on("CurrentProgramSceneChanged", (data) => {
        console.log("OBS Event: CurrentProgramSceneChanged", data);
        ws.send(
          JSON.stringify({
            type: "obs-event",
            updateType: "CurrentProgramSceneChanged",
            sceneName: data["sceneName"],
          })
        );
      });

      obs.on("SceneNameChanged", (data) => {
        console.log("OBS Event: SceneNameChanged", data);
        ws.send(
          JSON.stringify({
            type: "obs-event",
            updateType: "SceneNameChanged",
            ...data,
          })
        );
      });

      obs.on("SceneCreated", (data) => {
        console.log("OBS Event: SceneCreated", data);
        ws.send(
          JSON.stringify({
            type: "obs-event",
            updateType: "SceneCreated",
            ...data,
          })
        );
      });

      obs.on("RecordStateChanged", (data) => {
        console.log("OBS Event: RecordStateChanged", data);
        ws.send(
          JSON.stringify({
            type: "obs-event",
            updateType: "RecordStateChanged",
            ...data,
          })
        );
      });

      obs.on("RecordFileChanged", (data) => {
        console.log("OBS Event: RecordFileChanged", data);
        ws.send(
          JSON.stringify({
            type: "obs-event",
            updateType: "RecordFileChanged",
            ...data,
          })
        );
      });
      ws.on("message", (message) => {
        console.log(`Received from client: ${message}`);
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });

      ws.on("message", (message) => {
        console.log(`Received from client: ${message}`);
      });

      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
  }
}

module.exports = new ObsClient();
