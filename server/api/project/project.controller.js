'use strict';

var _ = require('lodash');
var Parse = require("../../components/parse_com").Parse;

var cachedResults = null;
var cachedDateMillis = null;

// Get list of projects
exports.index = function(req, res) {

  if (cachedDateMillis && cachedResults) {
    if (cachedDateMillis + (1000*60*60*2) < new Date().getTime()) {
      res.json({
        result: true,
        payload: cachedResults
      });
      return;
    }
  }

  var Projects = Parse.Object.extend("Projects");
  var query = new Parse.Query(Projects);
  query.equalTo("active", true).ascending('createdAt').find()
    .then(function (data) {
      cachedDateMillis = new Date().getTime();
      cachedResults = {
        result: true,
        payload: data.map(function (pobj) {
          var obj = {};
          ['name', 'project', 'activity', 'lead', 'gain',  'usage', 'createdAt', 'updatedAt'].forEach(function (key) {
            obj[key] = pobj.get(key);
          });
          return obj;
        })};
      res.json(cachedResults);
    })
    .fail(function(err) {
      res.json({
        result: false,
        payload: err
      });
    });
};
