angular.module('ngQuestionnaires.questions')

  .controller('questionShowCtrl', [
    '$scope',
    'questions',
    function ($scope, questions) {

      $scope.$watch(function () {
        return questions.getByName($scope.id);
      }, function (question) {
        $scope.question = question;
      });

    }
  ]);
