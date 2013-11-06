angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'pagination',
    'questionnaires',
    function ($scope, $filter, $modal, pagination, questionnaires) {

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.$watch('filteredQuestionnaires.length', function (value) {
        $scope.totalItems = value;
      });

      $scope.$watch('search.query', function (value) {
        $scope.page = 1;
        if (value) {
          $scope.filteredQuestionnaires = $filter('filter')(questionnaires, value);
        } else {
          $scope.filteredQuestionnaires = questionnaires;
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
              return questionnaires.getByName(id);
            }
          }
        }).result
          .then(function (questionnaire) {
            questionnaires.remove(questionnaire, function (err) {
              if (err) {
                $scope.addErrorAlert(err);
              } else {
                $scope.addSuccessAlert(questionnaire.title + ' deleted successfully');
              }
            });
          });
      };

    }]);
