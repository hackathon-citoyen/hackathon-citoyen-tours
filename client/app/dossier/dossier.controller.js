'use strict';
var Project = Parse.Object.extend("Projects");
angular.module('hackathonCitoyenApp')
  .controller('DossierCtrl', function ($scope) {
    $scope.startProjet = function(email) {
      console.log ('Start');
      Parse.Cloud.run('startProject', { email: email });
    };
  }).controller('DetailsCtrl', function($stateParams, $scope) {
    $scope.pid = $stateParams.pid;
    new Parse.Query(Project).get($scope.pid,{
      success: function(project) {
        $scope.$apply(function() {
          $scope.project = project.attributes;

          $scope.save = function() {
            for (var key in $scope.project) {
              if ($scope.project.hasOwnProperty(key)){
                project.set(key, $scope.project[key]);
              }
            }
            project.save();
          };
        });
      }
    });
  });
