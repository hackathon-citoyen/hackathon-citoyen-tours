'use strict';

var _ = require('lodash');
var Subscriber = require('./subscriber.model');

var mailchimp = require("../../components/mailchimp").instance;

// Get list of subscribers
exports.index = function(req, res) {
  Subscriber.find(function (err, subscribers) {
    if(err) { return handleError(res, err); }
    return res.json(200, subscribers);
  });
};

// Get a single subscriber
exports.show = function(req, res) {
  Subscriber.findById(req.params.id, function (err, subscriber) {
    if(err) { return handleError(res, err); }
    if(!subscriber) { return res.send(404); }
    return res.json(subscriber);
  });
};

// Creates a new subscriber in the DB.
exports.create = function(req, res) {

  function returnStatus(err, data) {
    if(err) { return handleError(res, err); }
    return res.json(201, data);
  }

  returnStatus(null,{});
  return;

  Subscriber.create(req.body, function(err, subscriber) {
    if (!err) {
      mailchimp.subscribe(req.body.email, function(err,result) {
        subscriber.mailchimp = result;
        subscriber.save(function(err) {
          if (err) {
            console.error("Failed to update subscriber with mailchimp id:", err);
          }
          return returnStatus(err, subscriber);
        });
      });
    } else {
      return returnStatus(err, subscriber);
    }
  });
};

// Updates an existing subscriber in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Subscriber.findById(req.params.id, function (err, subscriber) {
    if (err) { return handleError(res, err); }
    if(!subscriber) { return res.send(404); }
    var updated = _.merge(subscriber, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, subscriber);
    });
  });
};

// Deletes a subscriber from the DB.
exports.destroy = function(req, res) {
  Subscriber.findById(req.params.id, function (err, subscriber) {
    if(err) { return handleError(res, err); }
    if(!subscriber) { return res.send(404); }
    subscriber.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
