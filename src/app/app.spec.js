describe('appCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('appCtrl', { $scope: $scope });
  }));

  it('should be defined', inject(function () {
    expect(ctrl).toBeDefined();
  }));
});

