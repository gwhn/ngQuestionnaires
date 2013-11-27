angular.module('ngQuestionnaires.questionnaires')

  .controller('questionnaireShowCtrl', [
    '$scope',
    '$routeParams',
    'title',
    'underscore',
    function ($scope, $routeParams, title, underscore) {

      $scope.setTitle(title);

      $scope.$watch(function () {
        return $scope.questionnaires.getByName($routeParams.id);
      }, function (questionnaire) {
        $scope.questionnaire = questionnaire;
      });

      $scope.hasQuestions = function () {
        return $scope.questionnaire && $scope.questionnaire.questions;
      };

      function map() {
        var data = {
          title: 'ngQuestionnaires',
          children: []
        };
        underscore.each($scope.questionnaire.questions, function (e1) {
          var questions = data.children,
            question = underscore.find($scope.questions, function (e2) {
              return e2.$id === e1;
            }),
            choices = [];
          if (question) {
            questions.push({
              title: question.text,
              url: '/questions/show/' + e1,
              children: choices
            });
            underscore.each(question.choices, function (e3) {
              if (e3.count > 0) {
                choices.push({
                  title: e3.text,
                  count: e3.count
                });
              }
            });
          }
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
