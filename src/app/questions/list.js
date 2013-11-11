angular.module('ngQuestionnaires.questions')

  .controller('questionListCtrl', [
    '$scope',
    '$filter',
    'underscore',
    'pagination',
    'title',
    function ($scope, $filter, underscore, pagination, title) {

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

      $scope.isMatch = function (question) {
        return $scope.search.query ? (
          question.text.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
            underscore.any(question.choices, function (choice) {
              return choice.text.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1;
            })
          ) : true;
      };

    }
  ]);
