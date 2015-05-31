'use strict';

describe('Controller: ParticipantsCtrl', function () {

  // load the controller's module
  beforeEach(module('hackathonCitoyenApp'));

  var ParticipantsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParticipantsCtrl = $controller('ParticipantsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
