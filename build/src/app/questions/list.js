angular.module('ngQuestionnaires.questions').controller('QuestionListCtrl', [
  '$scope',
  '$filter',
  'underscore',
  'questionFactory',
  'pagination',
  function ($scope, $filter, underscore, questionFactory, pagination) {
    $scope.itemsPerPage = pagination.itemsPerPage;
    $scope.maxSize = pagination.maxSize;
    questionFactory.query().then(function (questions) {
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
    }, $scope.addErrorAlert);
    $scope.isMatch = function (question) {
      return $scope.search.query ? question.text.indexOf($scope.search.query) > -1 || underscore.any(question.choices, function (choice) {
        return choice.text.indexOf($scope.search.query) > -1;
      }) : true;
    };
  }
]);