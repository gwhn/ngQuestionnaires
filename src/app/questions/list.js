angular.module('ngQuestionnaires.questions')

  .controller('questionListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'underscore',
    'questions',
    'pagination',
    function ($scope, $filter, $modal, underscore, questions, pagination) {

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.questions = questions;

      $scope.$watch('search.query', function (value) {
        $scope.page = 1;
        if (value) {
          $scope.filteredQuestions = $filter('filter')($scope.questions, value);
        } else {
          $scope.filteredQuestions = questions;
        }
        $scope.totalItems = $scope.filteredQuestions.length;
      });

      $scope.isMatch = function (question) {
        return $scope.search.query ? (
          question.text.indexOf($scope.search.query) > -1 ||
            underscore.any(question.choices, function (choice) {
              return choice.text.indexOf($scope.search.query) > -1;
            })
          ) : true;
      };

      $scope.destroy = function (id) {
        $modal.open({
          controller: 'questionDeleteCtrl',
          templateUrl: 'questions/delete.tpl.html',
          resolve: {
            question: function () {
              return questions.getByName(id);
            }
          }
        }).result
          .then(function (question) {
            questions.remove(question, function (err) {
              if (err) {
                $scope.addErrorAlert(err);
              } else {
                $scope.addSuccessAlert(question.text + ' deleted successfully');
              }
            });
          });
      };

    }]);
