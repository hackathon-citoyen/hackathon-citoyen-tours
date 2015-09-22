'use strict';

angular.module('hackathonCitoyenApp')
  .directive('projectCard', function () {
    return {
      templateUrl: 'components/projectCard/projectCard.html',
      scope: {
        project: "=",
        type: "@",
        seeFull: "@"
      },
      restrict: 'E',
      controller: function($scope, htmlUtils) {
        $scope.cleanText = htmlUtils.showNewLinesInHtml;
      },
      link: function (scope, element, attrs) {
      }
    };
  });
