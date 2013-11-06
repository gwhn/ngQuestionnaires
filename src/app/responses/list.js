angular.module('ngQuestionnaires.responses')

  .controller('responseListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'pagination',
    'underscore',
    'title',
    function ($scope, $filter, $modal, pagination, underscore, title) {

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
              return $scope.responses.getByName(id);
            }
          }
        }).result
          .then(function (response) {
            $scope.responses.remove(response, function (err) {
              if (err) {
                $scope.setAlert('danger', err);
              } else {
                $scope.setAlert('success', 'Response from ' + response.respondent +
                  ' on ' + response.questionnaire + ' deleted successfully');
              }
              $scope.$apply();
            });
          });
      };

    }
  ]);
