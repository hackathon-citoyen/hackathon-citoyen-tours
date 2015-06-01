'use strict';

var MailChimpAPI = require('mailchimp').MailChimpAPI;

function MailChimpHelper() {
  var key = process.env.MAILCHIMP_KEY;
  console.log("Mailchimp Helper, key", key);

  this.api = null;
  try {
    if (key) {
      this.api = new MailChimpAPI(key, {version: '2.0'});
    } else {
      console.error("Mailchimp key is undefined! API is disabled.");
    }
  } catch (error) {
    console.log(error.message);
  }

  this.enabled = (this.api !== null);
}

MailChimpHelper.prototype.lists = function () {
  this.api.call("lists", "list", {}, function (err, data) {
    console.log("lists/list", err, data);
  });
}

MailChimpHelper.prototype.subscribe = function (email, callback) {
  if (!this.enabled) {
    console.error("Warning: Can't subscribe to the newsletter, MAILCHIMP_KEY is not set.");
    return callback(new Error("Mailchimp key not set"));
  }
  this.api.call("lists", "subscribe", {id: "3503f0bca9", email: {email: email}}, function (err, data) {
    console.log("callback for lists/subscribe", err, data);
    callback(err, data);
  });
}

module.exports.instance = new MailChimpHelper();
