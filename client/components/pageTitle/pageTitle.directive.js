'use strict';

angular.module('hackathonCitoyenApp')
  .directive('pageTitle', function () {
    return {
      template: '<div>' +
      '<header class="">' +
      '  <div class="container">' +
      '    <div class="main" style="text-align: left;">' +
      '       <h2><img src="../../assets/images/logo-1.png" style="height: 32px; margin-right: 16px;"><ng-transclude></ng-transclude></h2>' +
      '    </div>' +
        '  </div>' +
      '</header>' +
      '</div>',
      restrict: 'E',
      transclude:true
    };
  });



