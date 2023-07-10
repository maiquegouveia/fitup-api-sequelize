const express = require("express");
const mailerController = require("../controllers/mailerController");
const router = express.Router();

router
  .route("/accountConfirmation")
  .post(mailerController.sendConfirmationCode);
router.route("/accountRecovery").post(mailerController.sendRecoveryCode);

module.exports = router;
