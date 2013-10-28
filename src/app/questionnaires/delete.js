angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireDeleteCtrl', [
    '$scope',
    '$modalInstance',
    'questionnaire',
    function ($scope, $modalInstance, questionnaire) {
      $scope.questionnaire = questionnaire;

      $scope.confirm = function () {
        $modalInstance.close($scope.questionnaire);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
