describe('Test ngQuestionnaires.responses ResponseNewCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.responses'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('ResponseNewCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});