describe('Test ngQuestionnaires.questionnaires QuestionnaireNewCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questionnaires'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('QuestionnaireNewCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});

describe('Test ngQuestionnaires.questionnaires QuestionnaireEditCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questionnaires'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('QuestionnaireEditCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});
