angular.module('ngQuestionnaires.questions').controller('QuestionDeleteCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'questionFactory',
  function ($scope, $state, $stateParams, questionFactory) {
    questionFactory.get($stateParams.id).then(function (question) {
      $scope.question = question;
    });
    $scope.remove = function () {
      questionFactory.remove($stateParams.id).then(function () {
        $scope.addSuccessAlert($scope.question.text + ' deleted successfully');
      }, $scope.addErrorAlert).then(function () {
        $state.go('questionList');
      });
    };
  }
]);