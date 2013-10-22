angular.module('ngQuestionnaires.responses')

  .controller('ResponseDeleteCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'responseFactory',
    function ($scope, $state, $stateParams, responseFactory) {

      responseFactory.get($stateParams.id)
        .then(function (response) {
          $scope.response = response;
        }, $scope.addErrorAlert);

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
