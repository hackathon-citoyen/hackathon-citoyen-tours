'use strict';

angular.module('hackathonCitoyenApp')
  .controller('ProjectListCtrl', function ($scope, $http, $sce, projectData, htmlUtils) {
    $scope.message = 'Hello';

    $scope.projects = [];
    $scope.currentProject = null;

    var data = projectData.loadProjectList();
    data.then(function(projects) {
      console.log("hello", projects);
      $scope.projects = projects;
      $scope.$apply();

    }).catch(function(err) {
      $scope.errorMessage = (err && typeof err.toString === "function")?err.toString():err;
      $scope.$apply();
    });

    $scope.cleanText = htmlUtils.showNewLinesInHtml;

    $scope.setCurrentProject = function(project) {
      $scope.currentProject = project;
    };

  });
