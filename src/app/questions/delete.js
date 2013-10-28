angular.module('ngQuestionnaires.questions')

  .controller('questionDeleteCtrl', [
    '$scope',
    '$modalInstance',
    'question',
    function ($scope, $modalInstance, question) {
      $scope.question = question;

      $scope.confirm = function () {
        $modalInstance.close($scope.question);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
