// required imports
const express = require("express");
const providerService = require("../services/provider");
const router = express.Router();

// calling endpoints
router.get('/provider', providerService.getAllProviders);
router.post('/provider', providerService.insertProvider);
router.delete('/provider', providerService.deleteProvider);

module.exports = router;