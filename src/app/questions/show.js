angular.module('ngQuestionnaires.questions')

  .controller('QuestionShowCtrl', [
    '$scope',
    'questionFactory',
    function ($scope, questionFactory) {

      questionFactory.get($scope.questionId)
        .then(function (question) {
          $scope.question = question;
        }, $scope.addErrorAlert);

    }]);
