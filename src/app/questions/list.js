angular.module('ngQuestionnaires.questions')

  .controller('questionListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'underscore',
    'pagination',
    function ($scope, $filter, $modal, underscore, pagination) {

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

      $scope.destroy = function (id) {
        $modal.open({
          controller: 'questionDeleteCtrl',
          templateUrl: 'questions/delete.tpl.html',
          resolve: {
            question: function () {
              return $scope.questions.getByName(id);
            }
          }
        }).result
          .then(function (question) {
            $scope.questions.remove(question, function (err) {
              if (err) {
                $scope.addErrorAlert(err);
              } else {
                // need to delete any references from questionnaires
                $scope.addSuccessAlert(question.text + ' deleted successfully');
              }
              $scope.$apply();
            });
          });
      };

    }
  ]);
