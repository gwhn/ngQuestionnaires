angular.module('ngQuestionnaires.questions')

  .controller('questionListCtrl', [
    '$scope',
    '$filter',
    '$modal',
    'underscore',
    'questionFactory',
    'pagination',
    function ($scope, $filter, $modal, underscore, questionFactory, pagination) {

      $scope.itemsPerPage = pagination.itemsPerPage;
      $scope.maxSize = pagination.maxSize;

      $scope.queryQuestions = function () {
        $scope.loading(true);
        questionFactory.query()
          .then(function (questions) {
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
          }, $scope.addErrorAlert)
          .then(function () {
            $scope.loading(false);
          });
      };

      $scope.queryQuestions();

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
              return questionFactory.get(id);
            }
          }
        }).result
          .then(function (question) {
            return questionFactory.remove(id)
              .then(function () {
                $scope.addSuccessAlert(question.text + ' deleted successfully');
              }, $scope.addErrorAlert);
          })
          .then($scope.queryQuestions);
      };

    }]);
