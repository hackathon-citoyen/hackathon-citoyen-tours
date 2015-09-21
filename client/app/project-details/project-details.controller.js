'use strict';

angular.module('hackathonCitoyenApp')
  .controller('ProjectDetailsCtrl', function ($scope, projectData, $stateParams, htmlUtils) {

    $scope.cleanText = htmlUtils.showNewLinesInHtml;

    projectData.getProject($stateParams.projectId)
      .then(function(project) {
        console.log("project", project);
        $scope.currentProject = project;
        $scope.$apply();
      })
      .catch(function() {
      });



  });
