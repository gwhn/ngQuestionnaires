angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireDeleteCtrl', [
    '$scope',
    '$modalInstance',
    'questionnaire',
    function ($scope, $modalInstance, questionnaire) {
      $scope.questionnaire = questionnaire;

      $scope.ok = function () {
        $modalInstance.close($scope.questionnaire);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
