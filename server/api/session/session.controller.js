'use strict';

var _ = require('lodash');

var Parse = require("../../components/parse_com");

// Get list of sessions
exports.index = function(req, res) {
  res.json([]);
};

exports.create = function(req, res) {
  var email = req.body.email;

  res.json([]);
};
