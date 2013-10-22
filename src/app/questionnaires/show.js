angular.module('ngQuestionnaires.questionnaires')

  .controller('QuestionnaireShowCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionnaireFactory',
    function ($scope, $state, $stateParams, questionnaireFactory) {

      questionnaireFactory.get($stateParams.id)
        .then(function (questionnaire) {
          $scope.questionnaire = questionnaire;
        }, $scope.addErrorAlert);

      $scope.hasQuestions = function () {
        return $scope.questionnaire && $scope.questionnaire.questions;
      };

    }]);
