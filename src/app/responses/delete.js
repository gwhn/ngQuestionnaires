angular.module('ngQuestionnaires.responses')

  .controller('responseDeleteCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'responseFactory',
    function ($scope, $state, $stateParams, responseFactory) {

      $scope.loading(true);

      responseFactory.get($stateParams.id)
        .then(function (response) {
          $scope.response = response;
        }, $scope.addErrorAlert)
        .then(function () {
          $scope.loading(false);
        });

      $scope.remove = function () {
        responseFactory.remove($stateParams.id)
          .then(function () {
            $scope.addSuccessAlert('Response from ' + $scope.response.respondent +
              ' on ' + $scope.response.questionnaire + ' deleted successfully');
          }, $scope.addErrorAlert)
          .then(function () {
            $state.go('responseList');
          });
      };

    }]);
