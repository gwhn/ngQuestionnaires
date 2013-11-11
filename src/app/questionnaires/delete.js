angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireDeleteCtrl', [
    '$scope',
    '$routeParams',
    '$location',
    'title',
    function ($scope, $routeParams, $location, title) {

      function navigate() {
        $location.path('/questionnaires/list');
      }

      $scope.setTitle(title);

      $scope.$watch(function () {
        return $scope.questionnaires.getByName($routeParams.id);
      }, function (questionnaire) {
        $scope.questionnaire = questionnaire;
      });

      $scope.ok = function () {
        var successMsg = $scope.questionnaire.title + ' deleted successfully';
        $scope.questionnaires.remove($scope.questionnaire, function (err) {
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
