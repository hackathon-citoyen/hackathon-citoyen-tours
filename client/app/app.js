'use strict';

angular.module('hackathonCitoyenApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    // Hard initialize of parse.
    Parse.initialize("gxcxw9G1INtm9TMhBdTSb4nmPgy3G1llQ0GowIOk", "iBNoDRkQpSg8zCO7JLaBvMzOjKeI9OtQuROvdMxE");
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {

        var current = Parse.User.current();
        if (current) {

        }

        //config.headers = config.headers || {};
        //if ($cookieStore.get('token')) {
        //  config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        //}
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
