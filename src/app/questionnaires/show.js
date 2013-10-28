angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireShowCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionnaireFactory',
    function ($scope, $state, $stateParams, questionnaireFactory) {

      $scope.loading(true);

      questionnaireFactory.get($stateParams.id)
        .then(function (questionnaire) {
          $scope.questionnaire = questionnaire;
        }, $scope.addErrorAlert)
        .then(function () {
          $scope.loading(false);
        });

      $scope.hasQuestions = function () {
        return $scope.questionnaire && $scope.questionnaire.questions;
      };

    }]);
