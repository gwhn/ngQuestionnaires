describe('questionnaireDeleteCtrl', function () {
  var ctrl, scope, state, stateParams, factory, deferred,
    questionnaire = {title: 'test'};

  beforeEach(module('ui.router'));

  beforeEach(module('ngQuestionnaires.questionnaires'));

  beforeEach(inject(function ($controller, $rootScope, $state, $stateParams, $q) {
    scope = $rootScope.$new();
    state = $state;
    stateParams = $stateParams;
    factory = {
      get: function (id) {
        deferred = $q.defer();
        return deferred.promise;
      },
      remove: function (id) {}
    };
    spyOn(factory, 'get');
    ctrl = $controller('questionnaireDeleteCtrl', {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      questionnaireFactory: factory
    });
  }));

  it('should be defined', inject(function () {
    expect(ctrl).toBeDefined();
  }));

  it('should assign questionnaire to scope', function () {
    deferred.resolve(questionnaire);
    scope.$digest();
    expect(factory.get).toHaveBeenCalled();
    expect(scope.questionnaire).toBe(questionnaire);
  });

});

