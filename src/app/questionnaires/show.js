angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireShowCtrl', [
    '$scope',
    '$stateParams',
    'questionnaires',
    function ($scope, $stateParams, questionnaires) {

      $scope.$watch(function () {
        return questionnaires.getByName($stateParams.id);
      }, function (questionnaire) {
        $scope.questionnaire = questionnaire;
      });

      $scope.hasQuestions = function () {
        return $scope.questionnaire && $scope.questionnaire.questions;
      };

    }
  ]);
