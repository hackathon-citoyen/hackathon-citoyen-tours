'use strict';

angular.module('hackathonCitoyenApp')
  .directive('preventDefault', function () {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
          elem.on('click', function(e){
            e.preventDefault();
          });
        }
      }
    };
  });
