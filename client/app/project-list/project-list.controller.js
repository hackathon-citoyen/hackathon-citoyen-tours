'use strict';

angular.module('hackathonCitoyenApp')
  .controller('ProjectListCtrl', function ($scope, $http, $sce) {
    $scope.message = 'Hello';

    $scope.projects = [];
    $scope.currentProject = null;

    var Projects = Parse.Object.extend("Projects");
    var query = new Parse.Query(Projects);
    query.equalTo("active", true).ascending('createdAt').find()
      .then(function(res) {
        console.log("res:", res);
        var projects = res.map(function(pobj) {
          var obj = {};
          ['name', 'project', 'activity', 'lead', 'gain',  'usage','createdAt', 'updatedAt', 'active']
            .forEach(function (key) {
              obj[key] = pobj.get(key);
          });
          return obj;
        });
        $scope.projects = projects;
        $scope.$apply();
      })
      .fail(function(err) {
        $scope.errorMessage = "Impossible de charger la liste des projets.";
      });

    $scope.cleanText = function(text) {
      text = (text||"").replace("\n", "<br>");
      //text = $sce.
      return text;
    }

    $scope.setCurrentProject = function(project) {
      $scope.currentProject = project;
    }

  });
