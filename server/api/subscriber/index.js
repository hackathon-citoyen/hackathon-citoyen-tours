'use strict';

var express = require('express');
var controller = require('./subscriber.controller');

var router = express.Router();

router.post('/', controller.create);

// router.get('/', controller.index);

module.exports = router;
