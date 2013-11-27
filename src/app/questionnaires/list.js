angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireListCtrl', [
    '$scope',
    '$filter',
    'pagination',
    'title',
    'underscore',
    function ($scope, $filter, pagination, title, underscore) {

      $scope.setTitle(title);

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

      function map() {
        var data = {
          title: 'ngQuestionnaires',
          children: []
        };
        underscore.each($scope.questionnaires, function (e1) {
          var questionnaires = data.children,
            questions = [];
          questionnaires.push({
            title: e1.title,
            url: '/questionnaires/show/' + e1.$id,
            children: questions
          });
          underscore.each(e1.questions, function (e2) {
            var question = underscore.find($scope.questions, function (e3) {
                return e3.$id === e2;
              }),
              choices = [];
            if (question) {
              questions.push({
                title: question.text,
                children: choices
              });
              underscore.each(question.choices, function (e4) {
                if (e4.count > 0) {
                  choices.push({
                    title: e4.text,
                    count: e4.count
                  });
                }
              });
            }
          });
        });
        return data;
      }

      $scope.$watch('showChart', function (value) {
        if (value) {
          $scope.chart = map();
        }
      });

    }
  ]);
