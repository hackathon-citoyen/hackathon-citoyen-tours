'use strict';

angular.module('hackathonCitoyenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dossier', {
        url: '/dossier',
        templateUrl: 'app/dossier/dossier.html',
        controller: 'DossierCtrl'
      }).state('details', {
          url: '/details/:pid',
          templateUrl: 'app/dossier/details.html',
          controller: 'DetailsCtrl'
        }).state('dossier_ok', {
          url: '/dossier/ok',
          templateUrl: 'app/dossier/ok.html'
        });
  });
