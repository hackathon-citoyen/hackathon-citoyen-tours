'use strict';

angular.module('hackathonCitoyenApp')
  .controller('NewsletterSubsCtrl', ["$scope", "$http", function (scope, $http) {
    scope.emailOptions = {
      types: [
        {id:"association", label: "je représente une association", choiceLabel: "Association"},
        {id:"dev", label: "Je suis développeur", choiceLabel: "Développeur"},
        {id:"designer", label: "Je suis designer, graphiste", choiceLabel: "Designer, graphiste"},
        {id:"autre", label: "Je suis intéressé", choiceLabel: "Autre"}
      ]
    };
    scope.emailData = {
      address: "",
      type: {id: "none", label: "Je suis..."},
      registered: false
    };

    var EMAIL_RE = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    scope.subscribeNewsletter = function() {
      scope.emailData.error = undefined;

      if (!scope.emailData.address) {
        scope.emailData.error = "Vous devez indiquer votre adresse mail.";

      } else if (!EMAIL_RE.test(scope.emailData.address)) {
        scope.emailData.error = "L'email que vous avez saisi n'est pas valide.";

      } else if (scope.emailData.type.id == "none")  {
        $("#newsletterSubscribeDropdownType").focus();

      } else {
        scope.emailData.processing = true;
        scope.emailData.error = undefined;
        $http.post('/api/subscribers', {
          email: scope.emailData.address,
          type: {
            id: scope.emailData.type.id,
            label: scope.emailData.type.choiceLabel
          }
        }).success(function(data,status) {
          scope.emailRegistered = true;
          scope.emailData.processing = false;
        }).error(function(data,status){
          $("email-sub-error").modal('show');
          scope.emailData.processing = false;
        });
      }
    };

  }]);

