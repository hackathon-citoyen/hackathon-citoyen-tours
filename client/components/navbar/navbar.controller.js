'use strict';

angular.module('hackathonCitoyenApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      // 'title': 'Hackathon',
      'image': "/assets/images/logo-1.png",
      'link': '/'
    },{
      'title': 'Associations',
      'link': '/associations'
    },{
      'title': 'Participants',
      'link': '/participants'
    },{
      'title': 'Proposer un projet',
      'link': '/dossier'
    }

    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      var current = Parse.User.current();
      if (current) {
        Parse.User.logOut();
        $scope.loggedIn = false;
        $scope.userName = "";
        $location.path('/login');
      }
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    var current = Parse.User.current();
    if (current) {
      $scope.loggedIn = true;
      $scope.userName = current.getUsername();
    }

    $scope.$on("user-logged-in", function() {
      var current = Parse.User.current();
      if (current) {
        $scope.loggedIn = true;
        $scope.userName = current.getUsername();
        $scope.$apply();
      }
    });

  });
