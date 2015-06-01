'use strict';

var _ = require('lodash');

var mailchimp = require("../../components/mailchimp").instance;

// Get list of configs
exports.index = function(req, res) {
  res.json({
    mailEnabled: mailchimp.enabled
  });
};
