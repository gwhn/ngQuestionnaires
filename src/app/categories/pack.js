angular.module('ngQuestionnaires.categories')

  .controller('categoriesPackCtrl', [
    '$scope',
    'underscore',
    'title',
    function ($scope, underscore, title) {

      $scope.setTitle(title);

      function map() {
        var data = {
          title: 'ngQuestionnaires',
          children: []
        };
        underscore.each($scope.categories, function (e) {
          var categories = data.children,
            questionnaires = [];
          categories.push({
            title: e.name,
            children: questionnaires
          });
          underscore.each($scope.questionnaires, function (e1) {
            if (underscore.contains(e1.categories, e.$id)) {
              var questions = [];
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
                    choices.push({
                      title: e4.text,
                      count: e4.count
                    });
                  });
                }
              });
            }
          });
        });
        return data;
      }

      $scope.$watch('categories.length', function (n, o) {
        if (n > 0 && n === o) {
          $scope.data = map();
        }
      });

    }
  ]);
