describe('Test ngQuestionnaires.questionnaires QuestionnaireListCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questionnaires'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('QuestionnaireListCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});