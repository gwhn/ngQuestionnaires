describe('Test ngQuestionnaires.directives multipleRequired', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.directives'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('multipleRequired', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});