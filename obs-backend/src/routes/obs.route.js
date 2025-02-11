const express = require("express");
const obsController = require("../controllers/obs.controller");

const router = express.Router();

router.route("/start-recording").post(obsController.startRecording);
router.route("/stop-recording").post(obsController.stopRecording);
router.route("/current-filename").get(obsController.getCurrentFilename);
router.route("/switch-scene").post(obsController.switchScene);
router.route("/scenes").get(obsController.getScenes);

module.exports = router;
