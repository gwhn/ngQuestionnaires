angular.module('ngQuestionnaires.questions')

  .controller('questionDeleteCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionFactory',
    function ($scope, $state, $stateParams, questionFactory) {

      $scope.loading(true);

      questionFactory.get($stateParams.id)
        .then(function (question) {
          $scope.question = question;
        })
        .then(function () {
          $scope.loading(false);
        });

      $scope.remove = function () {
        questionFactory.remove($stateParams.id)
          .then(function () {
            $scope.addSuccessAlert($scope.question.text + ' deleted successfully');
          }, $scope.addErrorAlert)
          .then(function () {
            $state.go('questionList');
          });
      };

    }]);
