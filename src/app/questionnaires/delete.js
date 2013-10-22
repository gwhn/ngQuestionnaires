angular.module('ngQuestionnaires.questionnaires')

  .controller('QuestionnaireDeleteCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionnaireFactory',
    function ($scope, $state, $stateParams, questionnaireFactory) {

      questionnaireFactory.get($stateParams.id).then(function (questionnaire) {
        $scope.questionnaire = questionnaire;
      }, $scope.addErrorAlert);

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
