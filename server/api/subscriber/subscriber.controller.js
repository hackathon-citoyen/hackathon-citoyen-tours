'use strict';

var _ = require('lodash');

var mailchimp = require("../../components/mailchimp").instance;
var Parse = require("../../components/parse_com").Parse;
var async = require("async");

var Subscriber = Parse.Object.extend("Subscriber");

exports.create = function(req, res) {

  console.log("Subscriber...");

  var sub = new Subscriber();
  sub.set("email", req.body.email);
  sub.set("type", req.body.type.id);
  sub.set("label", req.body.type.label);

  async.waterfall([
      function(callback) {
        callback(null, sub);
      },
      mailchimp_subscribe,
      save_subscriber
    ],
  function(err, object) {
    console.log("final err:", JSON.stringify(err));
    if (err && err.message) {
      console.log("Error:", err.message);
      returnStatus(err,res,{error: err.message});
    }
    returnStatus(err,res,object);
  });
};

// generated code commented because not used _yet_
// Get list of subscribers
//exports.index = function(req, res) {
//  res.json([]);
//};

function handleError(res, err) {
  return res.send(500, err);
}

function returnStatus(err, res, data) {
  if(err) { return handleError(res, data || err); }
  return res.json(201, data);
}

function mailchimp_subscribe(subscriberObject, callback) {

  mailchimp.subscribe(subscriberObject.get("email"), function(err,result) {
    if (result && !err) {
      subscriberObject.set("mailchimp", result);
    } else {
      console.log("err code", err.code, typeof err.code);
      subscriberObject.set("mailchimp", err);
      if (err.code === 214) {
        console.log("Already...");
        return callback(new Error("already_subscribed"));
      } else {
        return callback(new Error("generic_error"));
      }
    }

    callback(err, subscriberObject);
  });
}

function save_subscriber(subscriberObject, callback) {
  console.log("Saving subscriber", subscriberObject);
  subscriberObject.save(null, {
    success: function(subscriberObject) {
      callback(null, subscriberObject);
    },
    error: function(err, subscriberObject) {
      callback(err, subscriberObject);
    }
  });
}
