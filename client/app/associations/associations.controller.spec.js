'use strict';

describe('Controller: AssociationsCtrl', function () {

  // load the controller's module
  beforeEach(module('hackathonCitoyenApp'));

  var AssociationsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssociationsCtrl = $controller('AssociationsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
