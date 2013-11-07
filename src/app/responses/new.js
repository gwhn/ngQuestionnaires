angular.module('ngQuestionnaires.responses')

  .controller('responseNewCtrl', [
    '$scope',
    '$location',
    '$routeParams',
    'underscore',
    'title',
    function ($scope, $location, $routeParams, underscore, title) {

      var response = {answers: {}};

      $scope.setTitle(title);

      $scope.$watch('user.email', function (email) {
        $scope.respondent = email;
      });

      $scope.$watch(function () {
        return $scope.questionnaires.getByName($routeParams.id);
      }, function (questionnaire) {
        $scope.questionnaire = questionnaire;
      });

      $scope.singleChoice = function (question, choice) {
        response.answers[question.$id] = {
          question: question.text,
          choices: [choice]
        };
      };

      $scope.multipleChoice = function (question, choice, index) {
        if (response.answers[question.$id] === undefined) {
          response.answers[question.$id] = {};
        }
        response.answers[question.$id].question = question.text;
        if (response.answers[question.$id].choices === undefined) {
          response.answers[question.$id].choices = [];
        }
        response.answers[question.$id].choices[index] = choice;
      };

      $scope.submit = function () {
        var answers = [],
          questions = [],
          choices = [],
          key,
          validChoice = function (choice) {
            return choice !== false;
          };

        for (key in response.answers) {
          if (response.answers.hasOwnProperty(key)) {
            choices = underscore.filter(response.answers[key].choices, validChoice);
            answers.push({
              question: response.answers[key].question,
              choices: choices
            });
            questions.push({
              id: key,
              choices: choices
            });
          }
        }

        $scope.responses.add({
          createdAt: Date.now(),
          userId: $scope.user.id,
          respondent: $scope.respondent,
          questionnaire: $scope.questionnaire.title,
          answers: answers
        }, function (err) {
          if (err) {
            $scope.setAlert('danger', err);
          } else {

            underscore.each(questions, function (q) {
              var question = $scope.questions.getByName(q.id);
              underscore.each(q.choices, function (t) {
                underscore.every(question.choices, function (c) {
                  if (c.text === t) {
                    c.count += 1;
                    return false;
                  }
                  return true;
                });
              });
              $scope.questions.update(question);
            });

            $scope.questionnaire.count += 1;
            $scope.questionnaires.update($scope.questionnaire);

            $scope.setAlert('success', 'Response from ' + $scope.respondent + ' on ' +
              $scope.questionnaire.title + ' saved successfully');
            $location.path('/questionnaires/list');

          }
          $scope.$apply();
        });
      };

    }
  ]);
