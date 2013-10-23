describe('Test ngQuestionnaires.questionnaires QuestionnaireShowCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questionnaires'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('QuestionnaireShowCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});