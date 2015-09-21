'use strict';

angular.module('hackathonCitoyenApp').service('htmlUtils', function () {

    this.showNewLinesInHtml = function showNewLinesInHtml(text) {
      text = (text||"").replace("\n", "<br>");
      return text;
    };

});
