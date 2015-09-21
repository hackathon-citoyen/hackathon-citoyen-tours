'use strict';

describe('Controller: ProjectDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('hackathonCitoyenApp'));

  var ProjectDetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectDetailsCtrl = $controller('ProjectDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
