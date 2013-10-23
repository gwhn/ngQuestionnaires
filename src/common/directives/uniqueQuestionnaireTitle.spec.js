describe('Test ngQuestionnaires.directives uniqueQuestionnaireTitle', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.directives'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('uniqueQuestionnaireTitle', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});