angular.module('ngQuestionnaires.responses')

  .controller('responseDeleteCtrl', [
    '$scope',
    '$modalInstance',
    'response',
    function ($scope, $modalInstance, response) {

      $scope.response = response;

      $scope.confirm = function () {
        $modalInstance.close($scope.response);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    }
  ]);
