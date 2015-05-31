'use strict';

angular.module('hackathonCitoyenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('associations', {
        url: '/associations',
        templateUrl: 'app/associations/associations.html',
        controller: 'AssociationsCtrl'
      });
  });