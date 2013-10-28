angular.module('ngQuestionnaires.questions')

  .controller('questionDeleteCtrl', [
    '$scope',
    '$modalInstance',
    'question',
    function ($scope, $modalInstance, question) {
      $scope.question = question;

      $scope.ok = function () {
        $modalInstance.close($scope.question);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
