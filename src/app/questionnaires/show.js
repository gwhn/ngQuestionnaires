angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireShowCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionnaires',
    function ($scope, $state, $stateParams, questionnaires) {

      $scope.loading(true);

      $scope.questionnaire = questionnaires.getByName($stateParams.id);

      $scope.hasQuestions = function () {
        return $scope.questionnaire && $scope.questionnaire.questions;
      };

    }]);
