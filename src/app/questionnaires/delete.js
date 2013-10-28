angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireDeleteCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionnaireFactory',
    function ($scope, $state, $stateParams, questionnaireFactory) {

      $scope.loading(true);

      questionnaireFactory.get($stateParams.id)
        .then(function (questionnaire) {
          $scope.questionnaire = questionnaire;
        }, $scope.addErrorAlert)
        .then(function () {
          $scope.loading(false);
        });

      $scope.remove = function () {
        questionnaireFactory.remove($stateParams.id)
          .then(function () {
            $scope.addSuccessAlert($scope.questionnaire.title + ' deleted successfully');
          }, $scope.addErrorAlert)
          .then(function () {
            $state.go('questionnaireList');
          });
      };

    }]);
