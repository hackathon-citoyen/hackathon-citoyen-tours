/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Newsletter = require('./newsletter.model');

exports.register = function(socket) {
  Newsletter.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Newsletter.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('newsletter:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('newsletter:remove', doc);
}