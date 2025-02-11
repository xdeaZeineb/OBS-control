const obsService = require("../services/obs.service");
const httpStatus = require("http-status");

class ObsController {
  async startRecording(req, res, next) {
    try {
      await obsService.startRecording();
      return res
        .status(httpStatus.CREATED)
        .send("Recording started successfully");
    } catch (err) {
      next(err);
    }
  }

  async stopRecording(req, res, next) {
    try {
      await obsService.stopRecording();
      return res
        .status(httpStatus.CREATED)
        .send("Recording stopped successfully");
    } catch (err) {
      next(err);
    }
  }

  async getCurrentFilename(req, res, next) {
    try {
      const response = await obsService.getCurrentFilename();
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async switchScene(req, res, next) {
    try {
      const { sceneName } = req.body;
      await obsService.switchScene(sceneName);
      return res.status(httpStatus.CREATED).send("Scene switched successfully");
    } catch (err) {
      next(err);
    }
  }
  async getScenes(req, res, next) {
    try {
      const response = await obsService.getScenes();
      return res.json(response.scenes);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ObsController();
