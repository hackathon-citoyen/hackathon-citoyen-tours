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
          .fail(function(err){return new Parse.Promise().resolve();})
          .then(function() {
            var user = new Parse.User();
            user.set("username", $scope.user.email);
            user.set("password", $scope.user.password);
            user.set("name", $scope.user.name);
            user.set("email", $scope.user.email);

            user.signUp(null, {
              success: function(user) {
                console.log("SIGN UP OK");
                $scope.signUpDone = true;
                $scope.$apply();
              },
              error: function(user, error) {
                console.log("Error signing up");
                // Show the error message somewhere and let the user try again.
                switch(error.code) {
                  case 202:
                    $scope.errors["name"] = error.message;
                    $scope.errorInfo = "Le nom d'utilisateur ou l'email existe déjà, merci de le modifier";
                    break;
                  case 203:
                    $scope.errors["email"] = error.message;
                    $scope.errorInfo = "Le nom d'utilisateur ou l'email existe déjà, merci de le modifier";
                    break;
                  case 203:
                    $scope.errorInfo = error.message + "("+error.code +")";
                    break;
                }
                $scope.processing = false;
                $scope.$apply();
                alert("Error: " + error.code + " " + error.message);
              }
            });
          })
        ;


        return;

        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
