'use strict';

var EMAIL_RE = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
var TYPE_OPTIONS = {
  types: [
    {id:"association", label: "je représente une association", choiceLabel: "Association"},
    {id:"dev", label: "Je suis développeur", choiceLabel: "Développeur"},
    {id:"designer", label: "Je suis designer, graphiste", choiceLabel: "Designer, graphiste"},
    {id:"autre", label: "Je suis intéressé", choiceLabel: "Autre"}
  ]
};

angular.module('hackathonCitoyenApp')
  .controller('NewsletterSubsCtrl', ["$scope", "$http", function (scope, $http) {
    scope.mailEnabled = false;

    scope.emailOptions = TYPE_OPTIONS;
    scope.emailData = {
      address: "",
      type: {id: "none", label: "Je suis..."},
      registered: false
    };

    scope.subscribeNewsletter = function() {
      scope.emailData.error = undefined;

      if (!scope.emailData.address) {
        scope.emailData.error = "Vous devez indiquer votre adresse mail.";

      } else if (!EMAIL_RE.test(scope.emailData.address)) {
        scope.emailData.error = "L'email que vous avez saisi n'est pas valide.";

      } else if (scope.emailData.type.id === "none")  {
        scope.emailData.error = "N'oubliez pas de remplir le champ 'Je suis...'";
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
        })
          .success(function() {
            scope.emailRegistered = true;
            scope.emailData.processing = false;
        })
          .error(function(data){
            console.log("err data", data);
            if (data.error === "already_subscribed") {
              scope.emailData.error = "Vous êtes déjà inscrit à la newsletter";
            } else {
              scope.emailData.error = "Une erreur s'est produite, merci de réessayer ultérieurement";
            }
            scope.emailData.processing = false;
        });
      }
    };


    $http.get('/api/config').success(function(data) {
      scope.mailEnabled = data.mailEnabled;
    });


  }]);

