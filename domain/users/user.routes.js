const express = require('express');
const TokenUtils = require('../tokens/token.utils');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const userController = require('./user.controller');

/// NOTE: Following Routes are appended to /user
router.get('/', userController.getUser);
router.post('/', userController.createUser);

module.exports = router;