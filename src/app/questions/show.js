angular.module('ngQuestionnaires.questions')

  .controller('questionShowCtrl', [
    '$scope',
    'questions',
    function ($scope, questions) {

      $scope.question = questions.getByName($scope.id);

    }
  ]);
