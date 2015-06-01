'use strict';

var Parse = require('parse').Parse;

var id = process.env.PARSE_ID;
var key = process.env.PARSE_KEY;

Parse.initialize(id, key);

module.exports.Parse = Parse;


