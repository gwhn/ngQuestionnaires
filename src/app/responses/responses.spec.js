describe('Test ngQuestionnaires.responses config', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.responses'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('ResponseDeleteCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});