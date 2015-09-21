'use strict';

angular.module('hackathonCitoyenApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $rootScope) {
    $scope.user = {};
    $scope.errors = {};

    //if (Parse.User.current()) {
    //  $location.path("/");
    //}

    $scope.enablePasswordRetrieval = function(value) {
      $scope.forgotPasswordState = value===undefined?true:value;
    };

    $scope.login = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        $scope.processing = true;
        Parse.User.logIn($scope.user.email, $scope.user.password, {})
          .then(function() {
            $rootScope.$broadcast("user-logged-in");
            $location.path('/');
            $scope.$apply();
          })
          .fail(function(err) {
            $scope.errors.other = "Impossible de se connecter (" + err.message + ")";
            $scope.processing = false;
          });
      }
    };

    $scope.reset = function() {
      $scope.submitted = true;
      Parse.User.requestPasswordReset($scope.user.email)
        .then(function() {
          $scope.submitted = false;
        })
        .fail(function(){
          // console.error("error:", err);
        })
      ;
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
