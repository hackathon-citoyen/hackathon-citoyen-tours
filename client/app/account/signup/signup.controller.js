'use strict';

angular.module('hackathonCitoyenApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;
      $scope.errorInfo = false;
      if(form.$valid) {
        $scope.processing = true;
        (function() {
          var current = Parse.User.current();
          if (current) {
            return Parse.User.logOut();
          } else {
            var prom = new Parse.Promise();
            prom.resolve("test");
            return prom;
          }
        })()
          .fail(function(){return new Parse.Promise().resolve();})
          .then(function() {
            var user = new Parse.User();
            user.set("username", $scope.user.email);
            user.set("password", $scope.user.password);
            user.set("name", $scope.user.name);
            user.set("email", $scope.user.email);

            user.signUp(null, {
              success: function() {
                $scope.signUpDone = true;
                $scope.$apply();
              },
              error: function(user, error) {
                switch(error.code) {
                  case 202:
                    $scope.errors.name = error.message;
                    $scope.errorInfo = "Le nom d'utilisateur ou l'email existe déjà, merci de le modifier";
                    break;
                  case 203:
                    $scope.errors.email = error.message;
                    $scope.errorInfo = "Le nom d'utilisateur ou l'email existe déjà, merci de le modifier";
                    break;
                  case 203:
                    $scope.errorInfo = error.message + "("+error.code +")";
                    break;
                }
                $scope.processing = false;
                $scope.$apply();
              }
            });
          })
        ;

        return;
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
