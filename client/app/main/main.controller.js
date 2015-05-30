'use strict';

angular.module('hackathonCitoyenApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $scope.message = "Yop";

    $scope.emailOptions = {
      types: [
        {id:"association", label: "je représente une association", choiceLabel: "Association"},
        {id:"dev", label: "Je suis développeur", choiceLabel: "Développeur"},
        {id:"designer", label: "Je suis designer, graphiste", choiceLabel: "Designer, graphiste"},
        {id:"autre", label: "Je suis intéressé", choiceLabel: "Autre"}
      ]
    };
    $scope.emailData = {
      address: "",
      type: {id: "none", label: "Je suis..."},
      registered: false
    };

    $scope.subscribeNewsletter = function() {
      if ($scope.emailData.address.length) {
        $scope.emailData.processing = true;
        $scope.emailData.error = undefined;
        $http.post('/api/subscribers', {
          email: $scope.emailData.address,
          type: {
            id: $scope.emailData.type.id,
            label: $scope.emailData.type.choiceLabel
          }
        }).success(function(data,status) {
          $scope.emailRegistered = true;
          $scope.emailData.processing = false;
        }).error(function(data,status){
          $("email-sub-error").modal('show');
          $scope.emailData.processing = false;
          });
      } else {
        $scope.emailData.error = "L'email que vous avez saisi n'est pas valide."
      }
    };
});
