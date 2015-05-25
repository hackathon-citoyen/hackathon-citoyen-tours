'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubscriberSchema = new Schema({
  email: String,
  type: {
    id: String,
    label: String
  },
  mailchimp: Schema.Types.Mixed,
  active: Boolean
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
