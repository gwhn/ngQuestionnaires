angular.module('ngQuestionnaires.questions')

  .controller('questionShowCtrl', [
    '$scope',
    'questionFactory',
    function ($scope, questionFactory) {

      questionFactory.get($scope.questionId)
        .then(function (question) {
          $scope.question = question;
        }, $scope.addErrorAlert);

    }]);
