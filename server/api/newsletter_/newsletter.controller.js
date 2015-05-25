'use strict';

var _ = require('lodash');
var Newsletter = require('./newsletter.model');

function mkUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}


// Get list of newsletters
exports.index = function(req, res) {
  Newsletter.find(function (err, newsletters) {
    if(err) { return handleError(res, err); }
    return res.json(200, newsletters);
  });
};

// Get a single newsletter
exports.show = function(req, res) {
  Newsletter.findById(req.params.id, function (err, newsletter) {
    if(err) { return handleError(res, err); }
    if(!newsletter) { return res.send(404); }
    return res.json(newsletter);
  });
};

// Creates a new newsletter in the DB.
exports.create = function(req, res) {
  req.body.added= new Date();
  req.body.uuid = mkUUID();
  req.active = true;
  Newsletter.create(req.body, function(err, newsletter) {
    if(err) { return handleError(res, err); }
    return res.json(201, newsletter);
  });
};

// Updates an existing newsletter in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Newsletter.findById(req.params.id, function (err, newsletter) {
    if (err) { return handleError(res, err); }
    if(!newsletter) { return res.send(404); }
    var updated = _.merge(newsletter, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, newsletter);
    });
  });
};

// Deletes a newsletter from the DB.
exports.destroy = function(req, res) {
  Newsletter.findById(req.params.id, function (err, newsletter) {
    if(err) { return handleError(res, err); }
    if(!newsletter) { return res.send(404); }
    newsletter.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
