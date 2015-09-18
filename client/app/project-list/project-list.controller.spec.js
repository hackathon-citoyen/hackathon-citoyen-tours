'use strict';

describe('Controller: ProjectListCtrl', function () {

  // load the controller's module
  beforeEach(module('hackathonCitoyenApp'));

  var ProjectListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectListCtrl = $controller('ProjectListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
