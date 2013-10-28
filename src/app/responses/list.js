angular.module('ngQuestionnaires.responses')

  .controller('responseListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'underscore',
    'responseFactory',
    'pagination',
    function ($scope, $filter, $modal, underscore, responseFactory, pagination) {

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.queryResponses = function () {
        $scope.loading(true);
        responseFactory.query()
          .then(function (responses) {
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
          }, $scope.addErrorAlert)
          .then(function () {
            $scope.loading(false);
          });
      };

      $scope.queryResponses();

      $scope.isMatch = function (response) {
        return $scope.search.query ? (
          response.questionnaire.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
            response.respondent.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
            underscore.any(response.answers, function (answer) {
              return answer.question.indexOf($scope.search.query.toLowerCase()) > -1 ||
                answer.choice.indexOf($scope.search.query.toLowerCase()) > -1;
            })
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

    }]);
