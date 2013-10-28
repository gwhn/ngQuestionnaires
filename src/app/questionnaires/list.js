angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'questionnaireFactory',
    'pagination',
    function ($scope, $filter, $modal, questionnaireFactory, pagination) {

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.queryQuestionnaires = function () {
        $scope.loading(true);
        questionnaireFactory.query()
          .then(function (questionnaires) {
            $scope.questionnaires = questionnaires;
            $scope.$watch('search.query', function (value) {
              $scope.page = 1;
              if (value) {
                $scope.filteredQuestionnaires = $filter('filter')($scope.questionnaires, value);
              } else {
                $scope.filteredQuestionnaires = questionnaires;
              }
              $scope.totalItems = $scope.filteredQuestionnaires.length;
            });
          }, $scope.addErrorAlert)
          .then(function () {
            $scope.loading(false);
          });
      };

      $scope.queryQuestionnaires();

      $scope.isMatch = function (questionnaire) {
        return $scope.search.query ? (
          questionnaire.title.indexOf($scope.search.query) > -1 ||
            questionnaire.description.indexOf($scope.search.query) > -1
          ) : true;
      };

      $scope.destroy = function (id) {
        $modal.open({
          controller: 'questionnaireDeleteCtrl',
          templateUrl: 'questionnaires/delete.tpl.html',
          resolve: {
            questionnaire: function () {
              return questionnaireFactory.get(id);
            }
          }
        }).result
          .then(function (questionnaire) {
            return questionnaireFactory.remove(id)
              .then(function () {
                $scope.addSuccessAlert(questionnaire.title + ' deleted successfully');
              }, $scope.addErrorAlert);
          })
          .then($scope.queryQuestionnaires);
      };
    }]);
