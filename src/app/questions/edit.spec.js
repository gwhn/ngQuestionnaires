describe('Test ngQuestionnaires.questions QuestionNewCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questions'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('QuestionNewCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});

describe('Test ngQuestionnaires.questions QuestionEditCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questions'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('QuestionEditCtrl', { $scope: $scope });
  }));

  it('should pass a dummy test', inject(function () {
    expect(ctrl).toBeTruthy();
  }));
});