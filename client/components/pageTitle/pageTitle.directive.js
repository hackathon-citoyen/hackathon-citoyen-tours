'use strict';

angular.module('hackathonCitoyenApp')
  .directive('pageTitle', function () {
    return {
      template: '<div>' +
      '<header class="logo-unit" id="banner">' +
      '  <div class="container">' +
      '    <div class="main" style="text-align: left;">' +
      '       <h1><img src="../../assets/images/logo-1.png" style="height: 92px; margin-right: 16px;"><ng-transclude></ng-transclude></h1>' +
      '    </div>' +
        '  </div>' +
      '</header>' +
      '</div>',
      restrict: 'E',
      transclude:true,
      link: function (scope, element, attrs) {
        scope.title = "TEST";
      }
    };
  });



