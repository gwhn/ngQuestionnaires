describe('Test ngQuestionnaires.questionnaires QuestionnaireDeleteCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questionnaires'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('QuestionnaireDeleteCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});