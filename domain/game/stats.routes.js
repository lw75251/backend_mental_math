const express = require('express');
const TokenUtils = require('../tokens/token.utils');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const statsController = require('./stats.controller');

/// NOTE: Following Routes are appended to /stats
// router.get('/', statsController.getstats);
// router.get('/add', statsController.getstats);
// router.get('/subtract', statsController.getstats);
// router.get('/multiply', statsController.getstats);
// router.get('/divide', statsController.getstats);

router.post('/', statsController.createStat);


module.exports = router;