angular.module('ngQuestionnaires.questions')

  .controller('questionListCtrl', [
    '$scope',
    '$filter',
    'pagination',
    'title',
    function ($scope, $filter, pagination, title) {

      $scope.setTitle(title);

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.$watch('filteredQuestions.length', function (value) {
        $scope.totalItems = value;
      });

      $scope.$watch('search.query', function (value) {
        $scope.page = 1;
        if (value) {
          $scope.filteredQuestions = $filter('filter')($scope.questions, value);
        } else {
          $scope.filteredQuestions = $scope.questions;
        }
      });

    }
  ]);
