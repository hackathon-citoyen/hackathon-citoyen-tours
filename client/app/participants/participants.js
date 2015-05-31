'use strict';

angular.module('hackathonCitoyenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('participants', {
        url: '/participants',
        templateUrl: 'app/participants/participants.html',
        controller: 'ParticipantsCtrl'
      });
  });