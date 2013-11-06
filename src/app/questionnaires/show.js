angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireShowCtrl', [
    '$scope',
    '$routeParams',
    'title',
    function ($scope, $routeParams, title) {

      $scope.setTitle(title);

      $scope.$watch(function () {
        return $scope.questionnaires.getByName($routeParams.id);
      }, function (questionnaire) {
        $scope.questionnaire = questionnaire;
      });

      $scope.hasQuestions = function () {
        return $scope.questionnaire && $scope.questionnaire.questions;
      };

    }
  ]);
