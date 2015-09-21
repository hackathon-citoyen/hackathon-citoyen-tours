'use strict';

angular.module('hackathonCitoyenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('project-details', {
        url: '/project-details/:projectId',
        templateUrl: 'app/project-details/project-details.html',
        controller: 'ProjectDetailsCtrl'
      });
  });
