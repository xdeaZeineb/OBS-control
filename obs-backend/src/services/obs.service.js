const obsClient = require("../client/obs.client");
const { getFormattedFilename } = require("../helpers/helpers");

class ObsService {
  async startRecording() {
    try {
      return await obsClient.startRecording();
    } catch (e) {
      console.error("OBS Recording Error:", e);
      throw new Error("couldn't start recording");
    }
  }

  async stopRecording() {
    try {
      return await obsClient.stopRecording();
    } catch (e) {
      console.error("OBS Recording Error:", e);
      throw new Error("couldn't stop recording");
    }
  }

  async getCurrentFilename() {
    try {
      const response = await obsClient.getCurrentFilename();
      const filenameTemplate = response.parameterValue;
      const currentFilename = getFormattedFilename(filenameTemplate);

      return `${currentFilename}.mov`;
    } catch (e) {
      console.error("OBS status Error:", e);
      throw new Error("couldn't get recording filename");
    }
  }

  async switchScene(sceneName) {
    try {
      return await obsClient.switchScene(sceneName);
    } catch (e) {
      console.error("OBS Switching Error:", e);
      throw new Error("couldn't switch scenes");
    }
  }

  async getScenes() {
    try {
      return await obsClient.getScenes();
    } catch (e) {
      console.error("OBS Response Error:", e);
      throw new Error("couldn't get scenes");
    }
  }
}

module.exports = new ObsService();
