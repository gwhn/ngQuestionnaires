angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'pagination',
    function ($scope, $filter, $modal, pagination) {

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

      $scope.destroy = function (id) {
        $modal.open({
          controller: 'questionnaireDeleteCtrl',
          templateUrl: 'questionnaires/delete.tpl.html',
          resolve: {
            questionnaire: function () {
              return $scope.questionnaires.getByName(id);
            }
          }
        }).result
          .then(function (questionnaire) {
            $scope.questionnaires.remove(questionnaire, function (err) {
              if (err) {
                $scope.addErrorAlert(err);
              } else {
                $scope.addSuccessAlert(questionnaire.title + ' deleted successfully');
              }
              $scope.$apply();
            });
          });
      };

    }]);
