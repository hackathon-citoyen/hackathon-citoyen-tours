'use strict';

angular.module('hackathonCitoyenApp')
  .controller('NavbarCtrl', function ($scope, $location) {
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
    },
      {
        title: "Liste de projets",
        link: "/project-list"
      }

    ];

    $scope.isCollapsed = true;

    $scope.logout = function() {
      var current = Parse.User.current();
      if (current) {
        Parse.User.logOut();
        updateUser();
        $location.path('/login');
      }
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    function updateUser() {
      var current = Parse.User.current();
      if (current) {
        $scope.loggedIn = true;
        $scope.isAdmin = current.get("isAdmin");
        $scope.userName = current.getUsername();
      } else {
        $scope.loggedIn = false;
        $scope.isAdmin = false;
        $scope.userName = "";
      }
    }

    updateUser();

    $scope.$on("user-logged-in", function() {
      updateUser();
    });
    $scope.$on("user-logged-out", function() {
      updateUser();
    });

  });
