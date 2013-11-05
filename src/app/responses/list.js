angular.module('ngQuestionnaires.responses')

  .controller('responseListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'pagination',
    'underscore',
    'responses',
    function ($scope, $filter, $modal, pagination, underscore, responses) {

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.$watch('filteredResponses.length', function (value) {
        $scope.totalItems = value;
      });

      $scope.$watch('search.query', function (value) {
        $scope.page = 1;
        if (value) {
          $scope.filteredResponses = $filter('filter')(responses, value);
        } else {
          $scope.filteredResponses = responses;
        }
      });

      $scope.isMatch = function (response) {
        return $scope.search.query ? (
          response.questionnaire.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
            response.respondent.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
            underscore.any(response.answers, function (answer) {
              return answer.question.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1 ||
                answer.choice.toLowerCase().indexOf($scope.search.query.toLowerCase()) > -1;
            })
          ) : true;
      };

      $scope.destroy = function (id) {
        $modal.open({
          controller: 'responseDeleteCtrl',
          templateUrl: 'responses/delete.tpl.html',
          resolve: {
            response: function () {
              return responses.getByName(id);
            }
          }
        }).result
          .then(function (response) {
            responses.remove(response, function (err) {
              if (err) {
                $scope.addErrorAlert(err);
              } else {
                $scope.addSuccessAlert('Response from ' + response.respondent +
                  ' on ' + response.questionnaire + ' deleted successfully');
              }
            });
          });
      };

    }
  ]);
