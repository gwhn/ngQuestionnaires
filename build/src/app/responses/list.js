angular.module('ngQuestionnaires.responses').controller('ResponseListCtrl', [
  '$scope',
  '$filter',
  'underscore',
  'responseFactory',
  'pagination',
  function ($scope, $filter, underscore, responseFactory, pagination) {
    $scope.itemsPerPage = pagination.itemsPerPage;
    $scope.maxSize = pagination.maxSize;
    responseFactory.query().then(function (responses) {
      $scope.responses = responses;
      $scope.$watch('search.query', function (value) {
        $scope.page = 1;
        if (value) {
          $scope.filteredResponses = $filter('filter')($scope.responses, value);
        } else {
          $scope.filteredResponses = responses;
        }
        $scope.totalItems = $scope.filteredResponses.length;
      });
    }, $scope.addErrorAlert);
    $scope.isMatch = function (response) {
      return $scope.search.query ? response.questionnaire.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 || response.respondent.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 || underscore.any(response.answers, function (answer) {
        return answer.question.indexOf($scope.search.query.toLowerCase()) > -1 || answer.choice.indexOf($scope.search.query.toLowerCase()) > -1;
      }) : true;
    };
  }
]);