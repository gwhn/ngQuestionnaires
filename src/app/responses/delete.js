angular.module('ngQuestionnaires.responses')

  .controller('responseDeleteCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'title',
    function ($scope, $routeParams, $location, title) {

      function navigate() {
        $location.path('/responses/list');
      }

      $scope.setTitle(title);

      $scope.$watch(function () {
        return $scope.responses.getByName($routeParams.id);
      }, function (response) {
        $scope.response = response;
      });

      $scope.ok = function () {
        var successMsg = $scope.response.questionnaire + ' from ' +
          $scope.response.respondent + ' deleted successfully';
        $scope.responses.remove($scope.response, function (err) {
          if (err) {
            $scope.setAlert('danger', err.code);
          } else {
            $scope.setAlert('success', successMsg);
          }
          navigate();
          $scope.$apply();
        });
      };

      $scope.cancel = navigate;

    }
  ]);
