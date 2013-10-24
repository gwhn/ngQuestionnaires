xdescribe('questionnaireNewCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questionnaires'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('questionnaireNewCtrl', { $scope: $scope });
  }));

  it('should be defined', inject(function () {
    expect(ctrl).toBeDefined();
  }));

});

xdescribe('questionnaireEditCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.questionnaires'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('questionnaireEditCtrl', { $scope: $scope });
  }));

  it('should be defined', inject(function () {
    expect(ctrl).toBeDefined();
  }));

});
