'use strict';

var Parse = require('parse').Parse;

var id = process.env.PARSE_ID;
var key = process.env.PARSE_KEY;

console.log("Initializing Parse with", id, key);
Parse.initialize(id, key);

module.exports.Parse = Parse;


