describe('Test ngQuestionnaires.questions QuestionListCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questions'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('QuestionListCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});