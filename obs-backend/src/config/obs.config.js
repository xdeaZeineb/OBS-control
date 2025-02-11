const configuration = require("../config/app.config");
const OBSWebSocket = require("obs-websocket-js").OBSWebSocket;

const obsClient = new OBSWebSocket();
obsClient
  .connect(configuration.obsURL(), configuration.obsPassword())
  .then(() => {
    console.log("Connected to OBS");
  })
  .catch((err) => {
    console.error("Failed to connect to OBS:", err);
  });

module.exports = obsClient;
