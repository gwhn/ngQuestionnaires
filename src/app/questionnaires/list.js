angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireListCtrl', [
    '$scope',
    '$filter',
    'pagination',
    'title',
    function ($scope, $filter, pagination, title) {

      $scope.setTitle(title);

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.$watch('filteredQuestionnaires.length', function (value) {
        $scope.totalItems = value;
      });

      $scope.$watch('search.query', function (value) {
        $scope.page = 1;
        if (value) {
          $scope.filteredQuestionnaires = $filter('filter')($scope.questionnaires, value);
        } else {
          $scope.filteredQuestionnaires = $scope.questionnaires;
        }
      });

      $scope.isMatch = function (questionnaire) {
        return $scope.search.query ? (
          questionnaire.title.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
            questionnaire.description.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1
          ) : true;
      };

    }
  ]);
