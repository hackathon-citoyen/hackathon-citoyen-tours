'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewsletterSchema = new Schema({
  email: { type: String, lowercase: true },
  type: String,

  uuid: String,
  added: Date,
  active: Boolean
});

module.exports = mongoose.model('Newsletter', NewsletterSchema);
