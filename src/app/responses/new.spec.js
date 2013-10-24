xdescribe('responseNewCtrl', function () {
  var ctrl, $scope;

  beforeEach(module('ngQuestionnaires.responses'));

  beforeEach(inject(function ($controller, $rootScope) {
    $scope = $rootScope.$new();
    ctrl = $controller('responseNewCtrl', { $scope: $scope });
  }));

  it('should be defined', inject(function () {
    expect(ctrl).toBeDefined();
  }));

});