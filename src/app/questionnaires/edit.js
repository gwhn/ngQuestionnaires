angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireNewCtrl', [
    '$scope',
    '$cacheFactory',
    '$state',
    'questionnaireFactory',
    'questionFactory',
    function ($scope, $cacheFactory, $state, questionnaireFactory, questionFactory) {
      var questionnaire = $cacheFactory.get('data').get('questionnaire');

      function navigate() {
        $cacheFactory.get('data').remove('questionnaire');
        $state.go('questionnaireList');
      }

      $scope.action = $state.current.data.action;

      if (questionnaire !== undefined) {
        $scope.questionnaire = questionnaire;
        $cacheFactory.get('data').remove('questionnaire');
      }

      questionFactory.query()
        .then(function (questions) {
          $scope.questions = questions;
        }, $scope.addErrorAlert);

      $scope.addQuestion = function () {
        $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
        $state.go('questionNew', {referrer: $state.current.name});
      };

      $scope.save = function () {
        questionnaireFactory.add($scope.questionnaire)
          .then(function () {
            $scope.addSuccessAlert($scope.questionnaire.title + ' saved successfully');
          }, $scope.addErrorAlert)
          .then(navigate);
      };

      $scope.cancel = navigate;

    }])

  .controller('questionnaireEditCtrl', [
    '$scope',
    '$cacheFactory',
    '$state',
    '$stateParams',
    'questionnaireFactory',
    'questionFactory',
    function ($scope, $cacheFactory, $state, $stateParams, questionnaireFactory, questionFactory) {

      var questionnaire = $cacheFactory.get('data').get('questionnaire'),
        navigate = function () {
          $cacheFactory.get('data').remove('questionnaire');
          $state.go('questionnaireShow');
        };

      $scope.action = $state.current.data.action;

      if (questionnaire === undefined) {
        questionnaireFactory.get($stateParams.id)
          .then(function (questionnaire) {
            $scope.questionnaire = questionnaire;
          }, $scope.addErrorAlert);
      } else {
        $scope.questionnaire = questionnaire;
        $cacheFactory.get('data').remove('questionnaire');
      }

      questionFactory.query()
        .then(function (questions) {
          $scope.questions = questions;
        }, $scope.addErrorAlert);

      $scope.addQuestion = function () {
        $cacheFactory.get('data').put('questionnaire', $scope.questionnaire);
        $state.go('questionNew', {returnTo: $state.current.name});
      };

      $scope.update = function () {
        questionnaireFactory.update($stateParams.id, $scope.questionnaire)
          .then(function () {
            $scope.addSuccessAlert($scope.questionnaire.title + ' updated successfully');
          }, $scope.addErrorAlert)
          .then(navigate);
      };

      $scope.cancel = navigate;

    }]);
