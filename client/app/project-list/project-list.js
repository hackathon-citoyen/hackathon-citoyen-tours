'use strict';

angular.module('hackathonCitoyenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('project-list', {
        url: '/project-list',
        templateUrl: 'app/project-list/project-list.html',
        controller: 'ProjectListCtrl'
      })
    ;
  });
