angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireShowCtrl', [
    '$scope',
    '$stateParams',
    'questionnaires',
    function ($scope, $stateParams, questionnaires) {

      $scope.questionnaire = questionnaires.getByName($stateParams.id);

      $scope.hasQuestions = function () {
        return $scope.questionnaire && $scope.questionnaire.questions;
      };

    }
  ])

  .controller('questionShowCtrl', [
    '$scope',
    'questions',
    function ($scope, questions) {

      $scope.question = questions.getByName($scope.id);

    }
  ]);
