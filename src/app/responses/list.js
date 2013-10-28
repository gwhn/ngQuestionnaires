angular.module('ngQuestionnaires.responses')

  .controller('responseListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'responseFactory',
    'pagination',
    function ($scope, $filter, $modal, responseFactory, pagination) {
      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.queryResponses = function () {
        $scope.loading(true);
        responseFactory.query()
          .then(function (responses) {
            $scope.responses = responses;
            $scope.$watch('search.query', function (value) {
              var i;
              $scope.page = 1;
              if (value) {
                $scope.filteredResponses = $filter('filter')($scope.responses, value);
              } else {
                $scope.filteredResponses = responses;
              }
              $scope.totalItems = $scope.filteredResponses.length;
            });
          }, $scope.addErrorAlert)
          .then(function () {
            $scope.loading(false);
          });
      };

      $scope.queryResponses();

      $scope.isMatch = function (response) {
        return $scope.search.query ? (
          response.questionnaire.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
            response.respondent.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1
          ) : true;
      };

      $scope.destroy = function (id) {
        $modal.open({
          controller: 'responseDeleteCtrl',
          templateUrl: 'responses/delete.tpl.html',
          resolve: {
            response: function () {
              return responseFactory.get(id);
            }
          }
        }).result
          .then(function (response) {
            return responseFactory.remove(id)
              .then(function () {
                $scope.addSuccessAlert('Response from ' + response.respondent +
                  ' on ' + response.questionnaire + ' deleted successfully');
              }, $scope.addErrorAlert);
          })
          .then($scope.queryResponses);
      };

    }])

  .controller('answerShowCtrl', ['$scope', function ($scope) {
    $scope.isCollapsed = true;
  }]);
