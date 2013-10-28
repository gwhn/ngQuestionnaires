angular.module('ngQuestionnaires.questions')

  .controller('questionShowCtrl', [
    '$scope',
    'questionFactory',
    function ($scope, questionFactory) {

      $scope.loading(true);

      questionFactory.get($scope.questionId)
        .then(function (question) {
          $scope.question = question;
        }, $scope.addErrorAlert)
        .then(function () {
          $scope.loading(false);
        });

    }]);
