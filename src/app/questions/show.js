angular.module('ngQuestionnaires.questions')

  .controller('questionShowCtrl', [
    '$scope',
    function ($scope) {

      $scope.$watch(function () {
        return $scope.questions.getByName($scope.id);
      }, function (question) {
        $scope.question = question;
      });

    }
  ]);
