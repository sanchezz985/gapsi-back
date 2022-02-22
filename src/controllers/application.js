// required imports
const express = require("express");
const applicationService = require("../services/application");
const router = express.Router();

// calling endpoints
router.get('/version', applicationService.getVersion);
router.get('/welcome', applicationService.getGreeting);

module.exports = router;