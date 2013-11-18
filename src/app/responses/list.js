angular.module('ngQuestionnaires.responses')

  .controller('responseListCtrl', [
    '$scope',
    '$filter',
    'pagination',
    'underscore',
    'title',
    function ($scope, $filter, pagination, underscore, title) {

      $scope.setTitle(title);

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.$watch('filteredResponses.length', function (value) {
        $scope.totalItems = value;
      });

      $scope.$watch('search.query', function (value) {
        $scope.page = 1;
        if (value) {
          $scope.filteredResponses = $filter('filter')($scope.responses, value);
        } else {
          $scope.filteredResponses = $scope.responses;
        }
      });

    }
  ]);
