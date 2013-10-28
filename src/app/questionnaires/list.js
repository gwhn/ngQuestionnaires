angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireListCtrl', [
    '$scope',
    '$filter',
    'questionnaireFactory',
    'pagination',
    function ($scope, $filter, questionnaireFactory, pagination) {

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.loading(true);

      questionnaireFactory.query()
        .then(function (questionnaires) {
          $scope.questionnaires = questionnaires;
          $scope.$watch('search.query', function (value) {
            $scope.page = 1;
            if (value) {
              $scope.filteredQuestionnaires = $filter('filter')($scope.questionnaires, value);
            } else {
              $scope.filteredQuestionnaires = questionnaires;
            }
            $scope.totalItems = $scope.filteredQuestionnaires.length;
          });
        }, $scope.addErrorAlert)
        .then(function () {
          $scope.loading(false);
        });

      $scope.isMatch = function (questionnaire) {
        return $scope.search.query ? (
          questionnaire.title.indexOf($scope.search.query) > -1 ||
            questionnaire.description.indexOf($scope.search.query) > -1
          ) : true;
      };

    }]);
