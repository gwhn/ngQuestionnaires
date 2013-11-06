angular.module('ngQuestionnaires.responses')

  .controller('responseNewCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'questionnaires',
    'questions',
    'responses',
    function ($scope, $state, $stateParams, questionnaires, questions, responses) {

      var response = {answers: {}};

      $scope.$watch('user.email', function (email) {
        $scope.respondent = email;
      });

      $scope.$watch(function () {
        return questionnaires.getByName($stateParams.id);
      }, function (questionnaire) {
        $scope.questionnaire = questionnaire;
      });

      $scope.answer = function (id, question, choice, index) {
        response.answers[id] = {
          question: question,
          choice: choice,
          index: index
        };
      };

      $scope.submit = function () {
        var as = [],
          qs = [],
          q,
          k,
          i;
        for (k in response.answers) {
          if (response.answers.hasOwnProperty(k)) {
            as.push({
              question: response.answers[k].question,
              choice: response.answers[k].choice
            });
            qs.push({
              id: k,
              index: response.answers[k].index
            });
          }
        }
        responses.add({
          userId: $scope.user.id,
          respondent: $scope.respondent,
          questionnaire: $scope.questionnaire.title,
          answers: as
        }, function (err) {
          if (err) {
            $scope.addErrorAlert(err);
          } else {
            for (i = 0; i < qs.length; i += 1) {
              q = questions.getByName(qs[i].id);
              if (q !== undefined) {
                q.choices[qs[i].index].count = q.choices[qs[i].index].count + 1;
                questions.update(q);
              }
            }
            $scope.addSuccessAlert('Response from ' + $scope.respondent + ' on ' +
              $scope.questionnaire.title + ' saved successfully');
            $state.go('questionnaireList');
          }
        });
      };

    }
  ]);
