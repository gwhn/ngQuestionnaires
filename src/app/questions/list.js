angular.module('ngQuestionnaires.questions')

  .controller('questionListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'underscore',
    'pagination',
    'questions',
    function ($scope, $filter, $modal, underscore, pagination, questions) {

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.$watch('filteredQuestions.length', function (value) {
        $scope.totalItems = value;
      });

      $scope.$watch('search.query', function (value) {
        $scope.page = 1;
        if (value) {
          $scope.filteredQuestions = $filter('filter')(questions, value);
        } else {
          $scope.filteredQuestions = questions;
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

    }
  ]);
