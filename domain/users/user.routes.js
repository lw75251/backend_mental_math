const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const userController = require('./user.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/', userController.test);
router.post('/', userController.createUser);

module.exports = router;