describe('Test ngQuestionnaires.services questionFactory', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.services'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('questionFactory', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});